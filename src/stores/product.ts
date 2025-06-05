import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useStoreInfo } from "../stores/storeInfo";
import type { StoreInfo, Product } from "../includes/interfaces";

export const useProductStore = defineStore("product", () => {
    const { storeInfo } = useStoreInfo();
    const activeTab = ref("all");
    const searchInput = ref("");
    const inventory = ref<Product[]>([]); // This will hold the modified list
    const originalInventory = ref<Product[]>([]); // Keep the original API response
    const sortOrder = ref<"asc" | "desc" | "def">("def"); // Null means default order

    // Watch storeInfo and update inventory when it changes
    watch(
        () => (storeInfo as StoreInfo)?.products,
        (newInventory) => {
            if (newInventory) {
                originalInventory.value = [...newInventory]; // Store original order
                inventory.value = [...newInventory]; // Copy data for modifications
            }
        },
        { immediate: true },
    );

    const toggleTab = (tab: string) => {
        activeTab.value = tab;
    };

    const selectSortOrder = (order: "asc" | "desc" | "def") => {
        sortOrder.value = order;

        if (order === "asc") {
            inventory.value.sort((a, b) => a.price - b.price);
        } else if (order === "desc") {
            inventory.value.sort((a, b) => b.price - a.price);
        } else {
            // Restore original order when "Default" is selected
            inventory.value = [...originalInventory.value];
        }
    };

    const filteredProducts = computed<Product[]>(() => {
        if (!inventory.value.length) return [];

        let products =
            activeTab.value === "all"
                ? inventory.value
                : inventory.value.filter((product) => product.category === activeTab.value);

        if (searchInput.value.trim()) {
            products = products.filter((product) =>
                product.product_name.toLowerCase().includes(searchInput.value.toLowerCase()),
            );
        }

        products = products.filter((product) => product.display === true);
        return products; // No sorting here, inventory is already sorted
    });

    const resetSort = () => {
        sortOrder.value = "def";
        inventory.value = [...originalInventory.value]; // Restore default order
    };

    return {
        activeTab,
        searchInput,
        toggleTab,
        selectSortOrder,
        resetSort,
        sortOrder,
        filteredProducts,
        inventory,
    };
});
