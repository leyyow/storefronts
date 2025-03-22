import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useCartStore = defineStore(
    "cart",
    () => {
        const cart = ref<any[]>([]);
        const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + (item.variant_price * item.selected_quantity), 0));
        const cartLength = computed(() => cart.value.length);

        // 🛒 Add items to the cart
        function addToCart(
            product: any,
            selections: { variant1: string; variant2: string; quantity: number },
            price: number,
            stockLeft: number,
        ) {
            const item = cart.value.find(
                (i) =>
                    i.id === product.id &&
                    i.selected_variant1 === selections.variant1 &&
                    i.selected_variant2 === selections.variant2,
            );
            if (item) {
                if (item.selected_quantity < item.variant_total_stock) {
                    item.selected_quantity += 1;
                } else {
                    return
                }
            } else {
                const cartItem = { ...product } as any;
                cartItem.selected_variant1 = selections.variant1;
                cartItem.selected_variant2 = selections.variant2;
                cartItem.selected_quantity = 1;
                cartItem.variant_price = price;
                cartItem.variant_total_stock = stockLeft;
                cartItem.itemTotal = price * selections.quantity;
                cart.value.push(cartItem);
            }
        }

        // 🔍 Check if a product with exact variants is in the cart
        function getCartItemQuantity(product: any) {
            const items = cart.value.filter((i) => i.id === product.id);
            return items.reduce((sum, item) => sum + item.selected_quantity, 0);
        }

        // ✅ Remove a specific selection from the cart
        function removeSelection(cartItem: any) {
            const del = cart.value.find(
                (i) =>
                    i.id === cartItem.id &&
                    (cartItem.selected_variant1 ? i.selected_variant1 === cartItem.selected_variant1 : true) &&
                    (cartItem.selected_variant2 ? i.selected_variant2 === cartItem.selected_variant2 : true),
            );
            const index = cart.value.indexOf(del)
            cart.value.splice(index, 1)
        }

        // ➕ Increase quantity of a selection
        function increaseSelectionQuantity(cartItem: any) {
            const item = cart.value.find(
                (i) =>
                    i.id === cartItem.id &&
                    (cartItem.selected_variant1 ? i.selected_variant1 === cartItem.selected_variant1 : true) &&
                    (cartItem.selected_variant2 ? i.selected_variant2 === cartItem.selected_variant2 : true),
            );
            if (item) {
                if (item.selected_quantity < (item.variant_total_stock || item.total_stock)) {
                    item.selected_quantity += 1;
                    item.itemTotal = item.variant_price * item.selected_quantity;
                }
            }
        }

        // ➖ Decrease quantity of a selection (removes item if quantity reaches 0)
        function decreaseSelectionQuantity(cartItem: any) {
            const item = cart.value.find(
                (i) =>
                    i.id === cartItem.id &&
                    (cartItem.selected_variant1 ? i.selected_variant1 === cartItem.selected_variant1 : true) &&
                    (cartItem.selected_variant2 ? i.selected_variant2 === cartItem.selected_variant2 : true),
            );
            if (item && item.selected_quantity > 1) {
                item.selected_quantity -= 1;
                item.itemTotal = item.variant_price * item.selected_quantity;
            }
        }

        function updateSelectionQuantity(cartItem: any, quantity: number) {
            const item = cart.value.find(
                (i) =>
                    i.id === cartItem.id &&
                    (cartItem.selected_variant1 ? i.selected_variant1 === cartItem.selected_variant1 : true) &&
                    (cartItem.selected_variant2 ? i.selected_variant2 === cartItem.selected_variant2 : true),
            );
            if (quantity > item.variant_total_stock) {
                item.selected_quantity = item.variant_total_stock;
            } else {
                item.selected_quantity = quantity
            }
            item.itemTotal = item.variant_price * item.selected_quantity;
        }

        function isProductInCart(product: any) {
            return cart.value.some((i) => i.id === product.id);
        }

        function isInStock(
            product: any,
            selections: { variant1: string; variant2: string; quantity: number },
        ) {
            const item = cart.value.find(
                (i) =>
                    i.id === product.id &&
                    i.selected_variant1 === selections.variant1 &&
                    i.selected_variant2 === selections.variant2,
            );

            if (item) {
                console.log(`Variant total stock: ${item.variant_total_stock}, Selected quantity: ${item.selected_quantity}`);
                return item.variant_total_stock > item.selected_quantity;
            } else {
                return true;
            }
        }

        function totalProductsCount() { 
            return cart.value.reduce((sum, item) => sum + item.selected_quantity, 0);
        }

        function clearCart() {
            cart.value = [];
        }

        watch(cartLength, (newLength) => {
            console.log("Cart length changed:", newLength);
        });

        watch(cartTotal, (newTotal) => {
            console.log("Cart total changed:", newTotal);
        });

        return {
            cart,
            cartTotal,
            cartLength,
            addToCart,
            getCartItemQuantity,
            isProductInCart,
            isInStock,
            removeSelection,
            increaseSelectionQuantity,
            decreaseSelectionQuantity,
            updateSelectionQuantity,
            clearCart,
            totalProductsCount,
        };
    },
    {
        persist: {
            key: "cartStore",
            storage: sessionStorage,
        },
    },
);
