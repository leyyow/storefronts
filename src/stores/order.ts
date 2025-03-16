import { defineStore } from "pinia";
import { shallowReactive } from "vue";

export const useOrderStore = defineStore(
    "order",
    () => {
        let shippingDetails = shallowReactive({
            name: "",
            email: "",
            phoneNumber: "",
            shippingMethod: "",
            location: "",
            address: "",
        });

        const resetShippingDetails = () => {
            shippingDetails = shallowReactive({
                name: "",
                email: "",
                phoneNumber: "",
                shippingMethod: "",
                location: "",
                address: "",
            });
        }

        return {
            shippingDetails,
            resetShippingDetails,
        };
    },

    {
        persist: {
            key: "orderStore",
            storage: localStorage,
        },
    },
);
