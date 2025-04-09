<template>
  <div class="w-full h-100 rounded-lg">
    <img
      :src="imageSrc"
      alt="product image"
      class="w-full h-full object-cover rounded-lg bg-granite-gray"
    />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  filteredProduct: {
    type: Object,
    required: true
  }
});

const imageSrc = computed(() => {
  return props.filteredProduct.images.length
    ? props.filteredProduct.images[0].image
    : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081';
});
</script>
