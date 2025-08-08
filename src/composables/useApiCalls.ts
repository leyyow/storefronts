import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { apiGet, apiPost } from "../includes/api";
import { useStoreInfo } from "../stores/storeInfo";
import { useUtils } from "./useUtils";
import type { ShippingOption, StoreInfo } from "../includes/interfaces";
import { computed } from "vue";
import { useGlobalStore } from "../stores/global";

export function useApiCalls() {
    const { updateStoreInfo } = useStoreInfo();
    const { setShowNotFound, setShowNotReady } = useGlobalStore();
    const { setFavicon, setTitle } = useUtils();

    // Fetch store info (requires merchantSlug)
    const fetchStoreInfo = (merchantSlug: { value: string }) =>
        useQuery({
            queryKey: ["storeInfo", merchantSlug],
            queryFn: async () => {
                if (!merchantSlug.value) throw new Error("Merchant slug is required");
                const response = (await apiGet(`/account/store-website/public/${merchantSlug.value}/`)) as {
                    status: number;
                    data: StoreInfo;
                };

                if (response.status === 200) {
                    updateStoreInfo(response.data);
                    setFavicon(response.data.store_logo);
                    setTitle(`${response.data.store_name} -- Powered by Leyyow!`);
                    if (!response.data.is_live) {
                        setShowNotReady(true);
                    }
                    return response.data;
                } else {
                    console.error("Fetch store info failed.");
                    sessionStorage.clear();
                    setShowNotFound(true);
                }
            },
            enabled: computed(() => !!merchantSlug.value), // Only run if merchantSlug exists
        });

    const createOrder = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ["createOrder"],
            mutationFn: async (data: any) => {
                return await apiPost("/inventory/orders/public/", data);
            },
            onSuccess: async (orderData: any) => {
                queryClient.refetchQueries({ queryKey: ["storeInfo"] });
                window.location.href = `https://checkout.paystack.com/${orderData.data.access_code}`;
            },
        });
    };

    const getRates = () => {
        return useMutation({
            mutationKey: ["shippingRates"],
            mutationFn: async (data: any) => {
                return (await apiPost("/shipping/rates/", data)) as { rates: { couriers: ShippingOption[] }; message: string };
            },
            onSuccess: (response) => {
                const { updateShippingOptions } = useStoreInfo();
                updateShippingOptions(response.rates.couriers);
                console.log("Shipping options updated:", response.rates.couriers);
            },
            onError: (error) => {
                console.error("Error fetching shipping rates:", error);
            },
            retry: false,
        });
    };

    return { fetchStoreInfo, createOrder, getRates };
}
