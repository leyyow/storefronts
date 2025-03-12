<template>
    <div>
        <!-- Product details will go here -->
        <p>product</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = ref(route.params.id);

// Fetch product details using productId
</script>
