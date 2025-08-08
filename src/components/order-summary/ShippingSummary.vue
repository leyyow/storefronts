<template>
    <div class="py-4 my-4 border-platinum border-t border-b flex flex-col gap-2.5">
        <div class="flex justify-between items-center mb-1">
            <h6>Shipping Information</h6>
            <router-link :to="{ name: 'ShippingDetails', params: { slug: currentSlug } }" class="cursor-pointer">
                <EditIcon />
            </router-link>
        </div>

        <p>{{ shippingDetails.firstName }} {{ shippingDetails.lastName }}</p>
        <p>{{ shippingDetails.email }}</p>
        <p>{{ shippingDetails.phoneNumber }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import EditIcon from "../../assets/icons/edit-icon.vue";

const route = useRoute();
const currentSlug = route.params.slug;

defineProps({
    shippingDetails: {
        type: Object,
        required: true,
    },
});
</script>
