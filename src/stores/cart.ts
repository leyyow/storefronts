import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore(
    "cart",
    () => {
        const cart = ref<any[]>([]);
        const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.itemTotal, 0));
        const cartLength = computed(() => cart.value.length);

        // 🛒 Add items to the cart
        function addToCart(product: any, selections: { variant1: string; variant2: string; quantity: number }) {
            const existingItem = cart.value.find(
                (i) =>
                    i.item.id === product.id &&
                    i.selections.variant1 === selections.variant1 &&
                    i.selections.variant2 === selections.variant2,
            );

            if (existingItem) {
                existingItem.selections.quantity += selections.quantity;
                existingItem.itemTotal = existingItem.item.price * existingItem.selections.quantity;
            } else {
                cart.value.push({
                    item: product,
                    selections: { ...selections },
                    itemTotal: product.price * selections.quantity,
                });
            }
        }

        // 🔍 Check if a product with exact variants is in the cart
        function getCartItemQuantity(product: any, selections: { variant1: string; variant2: string }) {
            const cartItem = cart.value.find(
                (i) =>
                    i.item.id === product.id &&
                    i.selections.variant1 === selections.variant1 &&
                    i.selections.variant2 === selections.variant2,
            );
            return cartItem ? cartItem.selections.quantity : 0;
        }

        // ✅ Remove a specific selection from the cart
        function removeSelection(product: any, selections: { variant1: string; variant2: string }) {
            cart.value = cart.value.filter(
                (i) =>
                    !(
                        i.item.id === product.id &&
                        i.selections.variant1 === selections.variant1 &&
                        i.selections.variant2 === selections.variant2
                    ),
            );
        }

        // ➕ Increase quantity of a selection
        function increaseSelectionQuantity(product: any, selections: { variant1: string; variant2: string }) {
            const cartItem = cart.value.find(
                (i) =>
                    i.item.id === product.id &&
                    i.selections.variant1 === selections.variant1 &&
                    i.selections.variant2 === selections.variant2,
            );
            if (cartItem) {
                cartItem.selections.quantity++;
                cartItem.itemTotal = cartItem.item.price * cartItem.selections.quantity;
            }
        }

        // ➖ Decrease quantity of a selection (removes item if quantity reaches 0)
        function decreaseSelectionQuantity(product: any, selections: { variant1: string; variant2: string }) {
            const cartItemIndex = cart.value.findIndex(
                (i) =>
                    i.item.id === product.id &&
                    i.selections.variant1 === selections.variant1 &&
                    i.selections.variant2 === selections.variant2,
            );
            if (cartItemIndex !== -1) {
                const cartItem = cart.value[cartItemIndex];
                if (cartItem.selections.quantity > 1) {
                    cartItem.selections.quantity--;
                    cartItem.itemTotal = cartItem.item.price * cartItem.selections.quantity;
                } else {
                    // Remove item if quantity is 1 and we decrease it
                    cart.value.splice(cartItemIndex, 1);
                }
            }
        }

        function isProductInCart(product: any) {
            return cart.value.some((i) => i.item.id === product.id);
        }

        function uniqueProductsCount() {
            const uniqueIds = new Set(cart.value.map((i) => i.item.id));
            return uniqueIds.size;
        }

        return {
            cart,
            cartTotal,
            cartLength,
            addToCart,
            getCartItemQuantity,
            isProductInCart,
            uniqueProductsCount,
            removeSelection,
            increaseSelectionQuantity,
            decreaseSelectionQuantity,
        };
    },

    {
        persist: {
            key: "cartStore",
            storage: localStorage,
        },
    },
);
