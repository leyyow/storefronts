import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore(
    "cart",
    () => {
        const cart = ref<any[]>([]);
        const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.total, 0));

        // Action to add items to the cart
        function addToCart(product: any, quantity: number) {
            cart.value.push({
                item: product,
                quantity: quantity,
                total: product.price * quantity,
            });
        }

        return { cart, cartTotal, addToCart };
    },

    {
        persist: {
            key: "cartStore",
            storage: localStorage,
        },
    },
);
