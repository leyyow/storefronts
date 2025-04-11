import type { StoreInfo } from "../includes/interfaces";
import { useStoreInfo } from "../stores/storeInfo";

export function useUtils() {
    const { storeInfo } = useStoreInfo();
    const currency = (storeInfo as StoreInfo)?.currency || "NGN";

    const convertToNaira = (amount: number) => { 
        return amount.toLocaleString("en-NG", { style: "currency", currency: currency });
    };

    const formatPrice = (priceInKobo: number) => {
        const nairaAmount = priceInKobo / 100;
        const formattedAmount = nairaAmount.toLocaleString("en-NG", { style: "currency", currency });
        const currencySymbol = new Intl.NumberFormat("en-NG", { style: "currency", currency })
            .formatToParts()
            .find(part => part.type === "currency")?.value || "";
        const [naira, kobo] = formattedAmount.replace(currencySymbol, "").split(".");
        return `<small class="me-0.5">${currencySymbol}</small><span>${naira}</span><small>.${kobo || "00"}</small>`;
    };

    

    const formatNaira = (price: number) => {
        const formattedAmount = price.toLocaleString("en-NG", { style: "currency", currency });
        const currencySymbol =
            new Intl.NumberFormat("en-NG", { style: "currency", currency })
                .formatToParts()
                .find((part) => part.type === "currency")?.value || "";
        const [naira, kobo] = formattedAmount.replace(currencySymbol, "").split(".");
        return `<small class="me-0.5">${currencySymbol}</small><span>${naira}</span><small>.${kobo || "00"}</small>`;
    };

    const trimmedString = (string: string) => {
        if (string.length < 20) {
            return false;
        }
        return string.substring(0, 20);
    };
    return { convertToNaira, formatPrice, trimmedString, formatNaira };
}
