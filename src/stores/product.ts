import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { useStoreInfo } from "../composables/useStoreInfo";

export const useProductStore = defineStore(
    "product",
    () => {
        const { storeInfo } = useStoreInfo();
        const activeTab = ref("all");
        const searchInput = ref("");
        const inventory = ref<any[]>([]); // Store inventory separately for persistence

        // Watch storeInfo and update inventory when it changes
        watchEffect(() => {
            if (storeInfo.value?.inventory) {
                inventory.value = storeInfo.value.inventory;
            }
        });

        const toggleTab = (tab: string) => {
            activeTab.value = tab;
        };

        const filteredProducts = computed(() => {
            if (!inventory.value.length) return [];

            let products: any =
                activeTab.value === "all"
                    ? inventory.value
                    : inventory.value.filter((product: any) => product.category === activeTab.value);

            if (searchInput.value.trim()) {
                products = products.filter((product: any) =>
                    product.product_name.toLowerCase().includes(searchInput.value.toLowerCase()),
                );
            }

            return products;
        });

        return {
            activeTab,
            searchInput,
            toggleTab,
            filteredProducts,
            inventory, // Make sure inventory is persisted
        };
    },
    {
        persist: {
            key: "productStore",
            storage: localStorage,
        },
    },
);
