import { useMutation, useQuery } from "@tanstack/vue-query";
import { apiGet, apiPost } from "../includes/api";

export function useApiCalls() {
    // Fetch store info (requires merchantSlug)
    const fetchStoreInfo = (merchantSlug: string) =>
        useQuery({
            queryKey: ["storeInfo", merchantSlug],
            queryFn: async () => {
                if (!merchantSlug) throw new Error("Merchant slug is required");
                return await apiGet("/store/info", { params: { merchant_slug: merchantSlug } });
            },
            enabled: !!merchantSlug, // Only run if merchantSlug exists
        });

    const createOrder = () =>
        useMutation({
            mutationKey: ["createOrder"],
            mutationFn: async (data: any) => {
                return await apiPost("inventory/order/create/", data);
            },
            onSuccess: async (orderData: any) => {
                await handleOrderSuccess(orderData);
            },
        });

    const handleOrderSuccess = async (orderData: any) => {
        const orderItemResponse = await createOrderItem.mutateAsync(orderData.id);
        if (orderItemResponse) {
            await processPayment.mutateAsync(orderData.id);
        }
    };

    const createOrderItem = useMutation({
        mutationKey: ["createOrderItem"],
        mutationFn: async (orderId: string) => {
            return await apiPost("inventory/order_item/create/", { orderId });
        },
    });

    const processPayment = useMutation({
        mutationKey: ["processPayment"],
        mutationFn: async (access_code: string) => {
            return await apiPost(`https://checkout.paystack.com/${access_code}`);
        },
    });

    return { fetchStoreInfo, createOrder };
}
