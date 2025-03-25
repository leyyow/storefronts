import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";

const { storeInfo } = useStoreInfo();

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

        const deliveryFee = computed(() => {
            const x = storeInfo.store.delivery_price.find((area: any) => {
                return area.location === shippingDetails.location;
            });

            return x?.price;
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
