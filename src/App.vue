<template>
    <div class="font-sato h-screen flex justify-center items-center">
        <div class="md:w-lg lg:w-sm w-full h-full max-h-screen overflow-y-auto scrollbar-hide">
            <div v-if="isLoading && routeName">
                <HomeSkeleton v-if="routeName === 'Home'" />
                <StoreHomeSkeleton v-else />
                <!-- rest of the skeletons -->
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
import { ref, watch, onMounted, computed } from "vue";
import { useStoreInfo } from "./stores/storeInfo.ts";
import { useApiCalls } from "./composables/useApiCalls.ts";
import { useRoute } from "vue-router";
import HomeSkeleton from "./components/skeletons/HomeSkeleton.vue";
import StoreHomeSkeleton from "./components/skeletons/StoreHomeSkeleton.vue";
import { useCartStore } from "./stores/cart.ts";
import { useGlobalStore } from "./stores/global.ts";

const { storeInfo, updateStoreInfo } = useStoreInfo();
const { setShowNotFound } = useGlobalStore();
const { fetchStoreInfo } = useApiCalls();
const route = useRoute();
const cartStore = useCartStore();
const merchantSlug = computed(() => route.params.slug);

// ✅ Call useQuery immediately with the computed slug
const storeQuery = fetchStoreInfo(merchantSlug);
watch(
    () => storeQuery.isError.value,
    (isError) => {
        if (isError) {
            console.error("Fetch store info failed.");
            setShowNotFound(true);
        }
    },
);
const isLoading = computed(() => storeQuery.isLoading.value);
const routeName = computed(() => route.name);
</script>
