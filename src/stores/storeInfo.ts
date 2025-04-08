import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = shallowReactive({});

        const updateStoreInfo = (info: any) => {
            storeInfo = info;
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
