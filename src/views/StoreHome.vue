<template>
    <div class="store-home">
        <h1>Welcome to the Store</h1>
        <router-link to="/">Go Home</router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define your component data
const data = ref({});

// Define your component methods
const methods = {
    // Add your methods here
};

// Define your computed properties
const computedProperties = {
    // Add your computed properties here
};

// Lifecycle hook
onMounted(() => {
    // Add your created hook logic here
});
</script>
