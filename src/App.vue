<template>
    <div class="font-aeonik h-screen flex justify-center items-center">
        <div class="md:w-lg lg:w-sm w-full h-full max-h-screen overflow-y-auto scrollbar-hide">
            <div v-if="isLoading && routeName">
                <HomeSkeleton v-if="routeName === 'Home'" />
                <StoreHomeSkeleton v-else />
                <!-- i will put the rest of the skeletons here -->
            </div>
            <router-view v-slot="{ Component }" v-else>
                <transition name="fade">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed, watch } from "vue";
import { useStoreInfo } from "./stores/storeInfo.ts";
import { useApiCalls } from "./composables/useApiCalls.ts";
import { useRoute } from "vue-router";
import HomeSkeleton from "./components/skeletons/HomeSkeleton.vue";
import StoreHomeSkeleton from "./components/skeletons/StoreHomeSkeleton.vue";

const { storeInfo, updateStoreInfo } = useStoreInfo();
const { fetchStoreInfo } = useApiCalls();
const route = useRoute();
const routeName = ref("");
const merchantSlug = ref("");
const isLoading = ref(false);

// Watch for route changes
watch(
    () => route.name,
    (newRouteName) => {
        routeName.value = newRouteName;
        console.log("Route Name:", routeName.value);
    },
    { immediate: true }
);

// Extract merchant slug from subdomain
onMounted(() => {
    const hostname = window.location.hostname; // e.g., "merchant_slug.leyyow.com"
    const parts = hostname.split(".");
    if (parts.length > 2) {
        merchantSlug.value = parts[0]; // Extract subdomain as merchantSlug
    }
    console.log("Merchant Slug:", merchantSlug.value);
});

// Fetch store info when `merchantSlug` is set
watchEffect(() => {
    if (merchantSlug.value) {
        const storeQuery = fetchStoreInfo(merchantSlug.value);
        isLoading.value = storeQuery.isLoading.value;

        watchEffect(() => {
            if (storeQuery.data.value) {
                updateStoreInfo(storeQuery.data.value);
                console.log("Store Info updated:", storeQuery.data.value);
            }
        });
    }
});
</script>
