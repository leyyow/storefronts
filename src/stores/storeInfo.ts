import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { StoreInfo, ShippingOption } from "../includes/interfaces";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = reactive<StoreInfo | {}>({});

        const shippingOptions = ref<ShippingOption[]>([]);

        const updateStoreInfo = (info: StoreInfo) => {
            Object.assign(storeInfo, info);
        };

        const updateShippingOptions = (options: ShippingOption[]) => {
            shippingOptions.value = options;
        };

        return {
            storeInfo,
            shippingOptions,
            updateStoreInfo,
            updateShippingOptions,
        };
    },

    {
        persist: {
            key: "storeInfo",
            storage: sessionStorage,
        },
    },
);
