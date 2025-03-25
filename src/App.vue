<template>
    <div class="font-aeonik h-screen flex justify-center items-center">
        <div class="md:w-lg lg:w-sm w-full h-full max-h-screen overflow-y-auto scrollbar-hide">
            <div v-if="isLoading">Loading...</div>
            <router-view v-slot="{ Component }" v-else>
                <transition name="fade">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from "vue";
import { useStoreInfo } from "./stores/storeInfo.ts";
import { useApiCalls } from "./composables/useApiCalls.ts";
import { useQueryClient } from "@tanstack/vue-query";

const { storeInfo, updateStoreInfo } = useStoreInfo();
const { fetchStoreInfo } = useApiCalls();
const queryClient = useQueryClient();

const merchantSlug = ref("");

// Extract merchant slug from subdomain
onMounted(() => {
    const hostname = window.location.hostname; // e.g., "merchant_slug.leyyow.com"
    const parts = hostname.split(".");

    if (parts.length > 2) {
        merchantSlug.value = parts[0]; // Set the subdomain as the merchantSlug
    }

    console.log("Merchant Slug:", merchantSlug.value);
});

// Function to fetch or invalidate store info
const fetchOrInvalidateStoreInfo = () => {
    if (storeInfo) {
        // If storeInfo exists, invalidate the query to fetch fresh data
        queryClient.invalidateQueries({ queryKey: ["storeInfo"] });
    } else {
        // Otherwise, fetch store info
        storeQuery.refetch();
    }
};

// Fetch store info reactively when `merchantSlug` changes
const storeQuery = fetchStoreInfo(merchantSlug);

// Get `isLoading` from the query result
const isLoading = computed(() => storeQuery.isLoading.value);

// Watch `merchantSlug` and trigger fetch or invalidate logic
// watchEffect(() => {
//     if (merchantSlug.value) {
//         fetchOrInvalidateStoreInfo();
//     }
// });

// Update store when data is fetched
// watchEffect(() => {
//     if (storeQuery.data.value) {
//         updateStoreInfo(storeQuery.data.value);
//         console.log("Store Info updated:", storeQuery.data.value);
//     }
// });
</script>
