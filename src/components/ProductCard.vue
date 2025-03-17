<script setup>
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/product";

const productStore = useProductStore();

defineProps({
    product: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <RouterLink :to="{ path: '/store/product', hash: `#${product.id}`  }" class="w-[32.5%] h-28 mb-0.5 rounded-sm bg-granite-gray relative">
        <img :src="product.image" alt="product image" class="w-full h-full object-cover rounded-sm" />

        <!-- out of stock  -->
        <div class="px-1.5 py-0.5 text-white bg-orioles-orange rounded-sm z-5 absolute top-1 right-1 w-auto flex justify-center items-center" v-if="product.total_stock === 0">
          <small>Out of Stock</small>
        </div>

        <!-- Price -->
        <div class="w-full relative bottom-8 z-5 h-6 p-1">
            <p class="bg-white w-full text-center rounded-sm">
                <small>₦</small><span>{{ product.price.toLocaleString() }}</span
                ><small>.00</small>
            </p>
        </div>
    </RouterLink>
</template>
