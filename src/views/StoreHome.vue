<template>
    <div class="store-home">
        <div class="ps-4 flex overflow-x-auto scrollbar-hide">
            <div :class="['tab border-b-2 py-2 px-3 cursor-pointer', activeTab === 'all' ? 'text-spanish-viridian border-spanish-viridian' : 'text-manatee border-manatee']" @click="toggleTab('all')" >
                All
            </div>
            <div v-for="category in storeInfo.categories" :class="['tab border-b-2 py-2 px-3 cursor-pointer', activeTab === category ? 'text-spanish-viridian border-spanish-viridian' : 'text-manatee border-manatee']" @click="toggleTab(category)" >
                {{ category }}
            </div>
        </div>

        <div class="py-5 px-4">
            <h3 class="font-regular">Shop</h3>
        </div>

        <section class="px-4">
            <div class="flex flex-wrap justify-between">
                <ProductCard v-for="product in storeInfo.inventory" :key="product.id" :product="product" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreInfo } from "../composables/useStoreInfo";
import ProductCard from "../components/ProductCard.vue";

const { storeInfo } = useStoreInfo();
const activeTab = ref('all');
const toggleTab = (tab) => {
    activeTab.value = tab;
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}

.scrollbar-hide {
    -ms-overflow-style: none;  /* Hide scrollbar for IE & Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */
}
</style>
