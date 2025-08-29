<script setup lang="ts">
import { defineProps } from "vue";
import type { PropType } from "vue";
import type { StoreInfo } from "../../includes/interfaces";
import { useRoute } from "vue-router";
import LocationIcon from "../../assets/icons/location-icon.vue";
import TruckIcon from "../../assets/icons/truck-icon.vue";
import EditIcon from "../../assets/icons/edit-icon.vue";

const route = useRoute();
const currentSlug = route.params.slug;

defineProps({
    shippingDetails: {
        type: Object,
        required: true,
    },
    storeInfo: {
        type: Object as PropType<StoreInfo>,
        required: true,
    },
});
</script>
<template>
    <div>
        <div class="flex justify-between items-center mb-1">
            <p class="text-manatee">Shipping Method</p>
            <router-link :to="{ name: 'ShippingDetails', params: { slug: currentSlug } }" class="cursor-pointer">
                <EditIcon />
            </router-link>
        </div>

        <div class="flex justify-between items-center mt-2">
            <p v-if="shippingDetails.shippingMethod === 'Delivery'">{{ shippingDetails.address }}</p>
            <p v-else>{{ storeInfo.pickup_location }}</p>

            <!-- delivery -->
            <div class="flex items-center text-granite-gray" v-if="shippingDetails.shippingMethod === 'Delivery'">
                <TruckIcon />
                <p>Delivery</p>
            </div>

            <!-- pickup -->
            <div class="flex items-center text-granite-gray" v-else>
                <LocationIcon />

                <p>Pickup</p>
            </div>
        </div>
    </div>
</template>
