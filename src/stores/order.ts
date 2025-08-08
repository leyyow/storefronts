import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";
import type { StoreInfo, ShippingDetails } from "../includes/interfaces";

const {storeInfo, shippingOptions} = useStoreInfo();

export const useOrderStore = defineStore(
    "order",
    () => {
        let shippingDetails = reactive<ShippingDetails>({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            shippingMethod: "",
            location: "",
            address: "",
        });

        const deliveryFee = computed(() => {
            const prices = shippingOptions;

            if (!Array.isArray(prices) || prices.length === 0) return 0;

            const amount = prices.find((option: any) => option.name === shippingDetails.location)?.amount;

            return Number(amount) || 0;
        });

        const resetShippingDetails = () => {
            shippingDetails = reactive({
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
