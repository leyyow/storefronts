import { useMutation, useQuery } from "@tanstack/vue-query";
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

    const createOrder = () =>
        useMutation({
            mutationKey: ["createOrder"],
            mutationFn: async (data: any) => {
                return await apiPost("inventory/orders/public/", data);
            },
            onSuccess: async (orderData: any) => {
                console.log(orderData);
                
                // await handleOrderSuccess(orderData);
            },
        });

    // const handleOrderSuccess = async (orderData: any) => {
    //     const orderItemResponse = await createOrderItem.mutateAsync(orderData.id);
    //     if (orderItemResponse) {
    //         await processPayment.mutateAsync(orderData.id);
    //     }
    // };

    // const createOrderItem = useMutation({
    //     mutationKey: ["createOrderItem"],
    //     mutationFn: async (orderId: string) => {
    //         return await apiPost("inventory/order_item/create/", { orderId });
    //     },
    // });

    // const processPayment = useMutation({
    //     mutationKey: ["processPayment"],
    //     mutationFn: async (access_code: string) => {
    //         return await apiPost(`https://checkout.paystack.com/${access_code}`);
    //     },
    // });

    return { fetchStoreInfo, createOrder };
}
