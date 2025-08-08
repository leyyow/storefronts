import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { StoreInfo } from "../includes/interfaces";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = reactive<StoreInfo | {}>({});

        const shippingOptions = ref([
            {
                id: 1,
                name: "Fez Delivery",
                value: "fez-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "3000",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
            {
                id: 2,
                name: "Vex Delivery",
                value: "vex-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "8000",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
            {
                id: 3,
                name: "Flex Delivery",
                value: "flex-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "5000",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
            {
                id: 4,
                name: "Fex Delivery",
                value: "fex-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "3000",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
            {
                id: 5,
                name: "lex Delivery",
                value: "lex-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "3000",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
            {
                id: 6,
                name: "ex Delivery",
                value: "ex-delivery",
                rating: "4.3",
                no_of_reviews: 243,
                text_rating: "Good",
                amount: "4500",
                pin_image: new URL("../assets/images/pngs/courier-image.png", import.meta.url).href,
            },
        ]);

        const updateStoreInfo = (info: StoreInfo) => {
            Object.assign(storeInfo, info);
        };

        return {
            storeInfo,
            shippingOptions,
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
