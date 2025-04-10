import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";
import type { StoreInfo } from "../includes/interfaces";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = shallowReactive < StoreInfo | {} >({});

        const updateStoreInfo = (info: StoreInfo) => {
            Object.assign(storeInfo, info);
        };

        return {
            storeInfo: computed(() => storeInfo),
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
