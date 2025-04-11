<template>
    <div class="flex gap-2 mb-2">
        <img :src="imageUrl" alt="product image" class="w-16 h-16 object-cover rounded-sm" />

        <div class="flex flex-col gap-2 flex-1">
            <div class="flex gap-1.5">
                <div class="w-[65%]">
                    <p v-if="trimmedName" class="leading-none pt-2 pb-3">{{ trimmedName }}...</p>
                    <p v-else class="leading-none pt-2 pb-3">{{ item.product_name }}</p>

                    <p class="text-granite-gray">
                        <span v-if="item.selected_variant1">{{ item.selected_variant1 }}</span
                        ><span v-if="item.selected_variant2">, {{ item.selected_variant2 }}</span
                        ><span v-if="item.selected_variant3">, {{ item.selected_variant3 }}</span>
                    </p>
                </div>
                <div class="w-[33%] flex flex-col items-end">
                    <p class="leading-none pt-2 pb-3 font-bold" v-html="formatPrice(item.itemTotal)"></p>

                    <p class="text-granite-gray w-full flex justify-end">Qty: {{ item.selected_quantity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { CartItem } from "../../includes/interfaces";
import { useUtils } from "../../composables/useUtils";

const { formatPrice } = useUtils();

const props = defineProps({
    item: {
        type: Object as () => CartItem,
        required: true,
    },
});

const imageUrl = computed(() =>
    props.item.images?.length
        ? props.item.images[0].image
        : "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081",
);

const trimmedName = computed(() =>
    props.item.product_name && props.item.product_name.length > 35 ? props.item.product_name.slice(0, 35) : "",
);
</script>
