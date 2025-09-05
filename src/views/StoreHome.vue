<template>
    <div class="store-home pb-4">
        <!-- <div class="ps-4 flex overflow-x-auto scrollbar-hide">
            <div
                :class="[
                    'tab border-b-2 py-2 px-3 cursor-pointer flex items-center',
                    productStore.activeTab === 'all'
                        ? 'text-spanish-viridian border-spanish-viridian'
                        : 'text-manatee border-manatee',
                ]"
                @click="productStore.toggleTab('all')"
            >
                <p>All</p>
            </div>
            <div
                v-for="category in storeInfo.categories"
                :class="[
                    'tab border-b-2 py-0 px-3 cursor-pointer flex items-center',
                    productStore.activeTab === category.category
                        ? 'text-spanish-viridian border-spanish-viridian'
                        : 'text-manatee border-manatee',
                ]"
                @click="productStore.toggleTab(category.category)"
            >
                <p>{{ category.category }}</p>
            </div>
        </div> -->

        <div class="pb-5 px-4">
            <h5 class="font-normal">Shop</h5>
        </div>

        <div class="pb-4 px-4 flex justify-between items-center">
            <div class="w-[70%] relative">
                <input
                    type="text"
                    placeholder="Search for by name"
                    v-model="productStore.searchInput"
                    class="bg-anti-flash-white text-dark-green placeholder:text-manatee rounded-sm w-full ps-8 pe-1.5 py-2.5 focus:outline-manatee"
                />
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="absolute top-2 left-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.4"
                        d="M7.66634 14.0002C11.1641 14.0002 13.9997 11.1646 13.9997 7.66683C13.9997 4.16903 11.1641 1.3335 7.66634 1.3335C4.16854 1.3335 1.33301 4.16903 1.33301 7.66683C1.33301 11.1646 4.16854 14.0002 7.66634 14.0002Z"
                        fill="#97A1AC"
                    />
                    <path
                        d="M14.1997 14.6669C14.0797 14.6669 13.9597 14.6202 13.873 14.5335L12.633 13.2935C12.453 13.1135 12.453 12.8202 12.633 12.6335C12.813 12.4535 13.1064 12.4535 13.293 12.6335L14.533 13.8735C14.713 14.0535 14.713 14.3469 14.533 14.5335C14.4397 14.6202 14.3197 14.6669 14.1997 14.6669Z"
                        fill="#97A1AC"
                    />
                </svg>
            </div>

            <!-- filter button  -->
            <div class="w-10 h-10">
                <button
                    class="bg-anti-flash-white rounded-sm w-full h-full flex items-center justify-center cursor-pointer"
                    @click="sortIsOpen = true"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7"
                    >
                        <path
                            opacity="0.4"
                            d="M10.793 1.3335H5.20634C2.77967 1.3335 1.33301 2.78016 1.33301 5.20683V10.7868C1.33301 13.2202 2.77967 14.6668 5.20634 14.6668H10.7863C13.213 14.6668 14.6597 13.2202 14.6597 10.7935V5.20683C14.6663 2.78016 13.2197 1.3335 10.793 1.3335Z"
                            fill="#445B54"
                        />
                        <path
                            d="M12 5.6665H4C3.72667 5.6665 3.5 5.43984 3.5 5.1665C3.5 4.89317 3.72667 4.6665 4 4.6665H12C12.2733 4.6665 12.5 4.89317 12.5 5.1665C12.5 5.43984 12.2733 5.6665 12 5.6665Z"
                            fill="#445B54"
                        />
                        <path
                            d="M10.6663 8.5H5.33301C5.05967 8.5 4.83301 8.27333 4.83301 8C4.83301 7.72667 5.05967 7.5 5.33301 7.5H10.6663C10.9397 7.5 11.1663 7.72667 11.1663 8C11.1663 8.27333 10.9397 8.5 10.6663 8.5Z"
                            fill="#445B54"
                        />
                        <path
                            d="M8.88645 11.3335H7.10645C6.83311 11.3335 6.60645 11.1068 6.60645 10.8335C6.60645 10.5602 6.83311 10.3335 7.10645 10.3335H8.88645C9.15978 10.3335 9.38645 10.5602 9.38645 10.8335C9.38645 11.1068 9.16645 11.3335 8.88645 11.3335Z"
                            fill="#445B54"
                        />
                    </svg>
                </button>

                <Dialog v-model:visible="sortIsOpen" modal header="Sorting by" class="w-11/12">
                    <SortPopup @closePopup="sortIsOpen = false" />
                </Dialog>
            </div>

            <!-- cart  -->
            <CartButton :totalProducts="totalProducts" :showText="false" />
        </div>

        <section class="px-4">
            <div class="flex flex-wrap gap-1">
                <ProductCard v-for="product in productStore.filteredProducts" :key="product.id" :product="product" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";
import ProductCard from "../components/ProductCard.vue";
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";
import SortPopup from "../components/SortPopup.vue";
import { useRoute } from "vue-router";
import CartButton from "../components/product-details/CartButton.vue";

const route = useRoute();
const currentSlug = route.params.slug;
const sortIsOpen = ref(false);
const { storeInfo } = useStoreInfo();
const productStore = useProductStore();
const cartStore = useCartStore();

const totalProducts = computed(() => cartStore.cart.reduce((sum, item) => sum + item.selected_quantity, 0));
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}

.scrollbar-hide {
    -ms-overflow-style: none; /* Hide scrollbar for IE & Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}
</style>
