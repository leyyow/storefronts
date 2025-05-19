import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { apiGet, apiPost } from "../includes/api";
import { useStoreInfo } from "../stores/storeInfo";
import { useUtils } from "./useUtils";
import type { StoreInfo } from "../includes/interfaces";
import { computed } from "vue";
import { useRouter } from "vue-router";

export function useApiCalls() {
    const { updateStoreInfo } = useStoreInfo();
    const { setFavicon, setTitle } = useUtils();
    const router = useRouter();
    
    // Fetch store info (requires merchantSlug)
    const fetchStoreInfo = (merchantSlug: { value: string; }) =>
        useQuery({
            queryKey: ["storeInfo", merchantSlug],
            queryFn: async () => {
                sessionStorage.clear()
                if (!merchantSlug.value) throw new Error("Merchant slug is required");
                const response = (await apiGet(`/account/store-website/public/${merchantSlug.value}/`)) as {
                    status: number;
                    data: StoreInfo;
                };

                if (response.status === 200) {
                    updateStoreInfo(response.data);
                    setFavicon(response.data.store_logo);
                    setTitle(`${response.data.store_name} -- Powered by Leyyow!`);
                    return response.data;
                } else {
                    console.error("Fetch store info failed.");
                    router.push({ name: "NotFound" });
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
    }
    return { fetchStoreInfo, createOrder };
}
