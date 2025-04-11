import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";
import type { StoreInfo, ShippingDetails } from "../includes/interfaces";

const {storeInfo} = useStoreInfo();

export const useOrderStore = defineStore(
    "order",
    () => {
        let shippingDetails = shallowReactive<ShippingDetails>({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            shippingMethod: "",
            location: "",
            address: "",
        });

        const deliveryFee = computed(() => {
            const amount = (storeInfo as StoreInfo)?.shipping_prices?.find(
                (area: any) => area.area === shippingDetails.location,
            )?.amount;

            return Number(amount) || 0;
        });

        const resetShippingDetails = () => {
            shippingDetails = shallowReactive({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                shippingMethod: "",
                location: "",
                address: "",
            });
        }

        return {
            shippingDetails,
            deliveryFee,
            resetShippingDetails,
        };
    },

    {
        persist: {
            key: "orderStore",
            storage: sessionStorage,
        },
    },
);
