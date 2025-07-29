import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore(
    "global",
    () => {
        const showNotFound = ref(false);
        const showNotReady = ref(false);

        const setShowNotFound = (value: boolean) => {
            showNotFound.value = value;
        };

        const setShowNotReady = (value: boolean) => {
            showNotReady.value = value;
        };

        return {
            showNotFound,
            setShowNotFound,
            showNotReady,
            setShowNotReady,
        };
    },
);
