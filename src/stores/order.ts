import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";
import type { ShippingDetails, ShippingOption } from "../includes/interfaces";

const { shippingOptions } = useStoreInfo();

export const useOrderStore = defineStore(
    "order",
    () => {
        let shippingDetails = reactive<ShippingDetails>({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            shippingMethod: "",
            courier: {},
            rate: "",
            address: "",
            courier_id: "", // Optional for backward compatibility
        });

        const deliveryFee = computed(() => {
            const prices = shippingOptions;

            if (!Array.isArray(prices) || prices.length === 0) return 0;

            const amount = prices.find(
                (option: ShippingOption) => option.courier_id === shippingDetails.courier_id,
            )?.total_amount;

            return Number(amount) || 0;
        });

        const resetShippingDetails = () => {
            shippingDetails = reactive({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                shippingMethod: "",
                courier: {},
                rate: "",
                address: "",
                courier_id: "", // Optional for backward compatibility
            });
        };

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
