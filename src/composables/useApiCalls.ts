import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { apiGet, apiPost } from "../includes/api";
import { useStoreInfo } from "../stores/storeInfo";

export function useApiCalls() {
    const { updateStoreInfo } = useStoreInfo();
    
    // Fetch store info (requires merchantSlug)
    const fetchStoreInfo = (merchantSlug: string) =>
        useQuery({
            queryKey: ["storeInfo", merchantSlug],
            queryFn: async () => {
                if (!merchantSlug) throw new Error("Merchant slug is required");
                const response = await apiGet(`/account/store-website/public/${merchantSlug}/`) as { status: number; data: any };

                console.log('Merchant Slug:', merchantSlug);
                
                console.log(response.data);

                if (response.status === 200) {
                    updateStoreInfo(response.data);
                    return response.data;
                }
            },
            enabled: !!merchantSlug, // Only run if merchantSlug exists
        });

    const createOrder = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ["createOrder"],
            mutationFn: async (data: any) => {
                return await apiPost("inventory/orders/public/", data);
            },
            onSuccess: async (orderData: any) => {
                queryClient.refetchQueries({ queryKey: ["storeInfo"] });
                window.location.href = `https://checkout.paystack.com/${orderData.data.access_code}`;
            },
        });
    }
    return { fetchStoreInfo, createOrder };
}
