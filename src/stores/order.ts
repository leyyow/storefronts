import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";
import { useStoreInfo } from "../stores/storeInfo";

const storeInfo = useStoreInfo().storeInfo as { shipping_prices: { area: string; amount: number }[] };

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
            const x = storeInfo?.shipping_prices?.find((area: any) => {
                return area.area === shippingDetails.location;
            });
            return x?.amount ? Number(x?.amount) : x?.amount;
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
