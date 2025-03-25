import { useQuery } from "@tanstack/vue-query";
import { apiGet } from "../includes/api";

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

    // Example of another API call that doesn't require merchantSlug
    const fetchProducts = () =>
        useQuery({
            queryKey: ["products"],
            queryFn: async () => await apiGet("/products"),
        });

    return { fetchStoreInfo, fetchProducts };
}
