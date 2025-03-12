<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="'/product/' + product.id" class="w-[32%] h-28 mb-2 rounded-sm">
    <img :src="product.image" alt="product image" class="w-full h-full object-cover rounded-sm" />

    <!-- Price -->
    <div class="w-full relative bottom-8 z-10 h-6 p-1">
      <p class="bg-white w-full text-center rounded-sm">
        <small>N</small><span>{{ product.price }}</span><small>.00</small>
      </p>
    </div>
  </RouterLink>
</template>
