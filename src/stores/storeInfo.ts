import { defineStore } from "pinia";
import { reactive } from "vue";
import type { StoreInfo } from "../includes/interfaces";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = reactive< StoreInfo | {} >({});

        const updateStoreInfo = (info: StoreInfo) => {
            Object.assign(storeInfo, info);
        };

        return {
            storeInfo,
            updateStoreInfo,
        };
    },

    {
        persist: {
            key: "storeInfo",
            storage: sessionStorage,
        },
    },
);
