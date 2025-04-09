<template>
    <div class="flex flex-col h-dvh w-full overflow-y-hidden">
        <div class="h-16 px-4 flex justify-between items-center">
            <h6 class="font-normal">Order Summary</h6>
            <router-link to="/store/cart" class="underline text-spanish-viridian text-xs">Edit All</router-link>
        </div>

        <div class="flex-1 overflow-y-auto px-4 pt-2 pb-4">
            <div class="flex gap-2 mb-2" v-for="item in cart">
                <img
                    :src="
                        item.images.length
                            ? item.images[0].image
                            : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081'
                    "
                    alt="product image"
                    class="w-16 h-16 object-cover rounded-sm"
                />

                <div class="flex flex-col gap-2 flex-1">
                    <div class="flex gap-1.5">
                        <div class="w-[65%]">
                            <p v-if="trimmedString(item.product_name)" class="leading-none pt-2 pb-3">
                                {{ trimmedString(item.product_name) }}...
                            </p>
                            <p class="leading-none pt-2 pb-3" v-else>{{ item.product_name }}</p>

                            <p class="text-granite-gray">
                                <span v-if="item.selected_variant1">{{ item.selected_variant1 }}</span
                                ><span v-if="item.selected_variant2">, {{ item.selected_variant2 }}</span
                                ><span v-if="item.selected_variant3">, {{ item.selected_variant3 }}</span>
                            </p>
                        </div>
                        <div class="w-[33%] flex flex-col items-end">
                            <p class="leading-none pt-2 pb-3 font-bold">
                                <small class="me-0.5">₦</small>{{ (item.itemTotal / 100).toLocaleString()
                                }}<small>.00</small>
                            </p>

                            <p class="text-granite-gray w-full flex justify-end">Qty: {{ item.selected_quantity }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-4 my-4 border-platinum border-t border-b flex flex-col gap-2.5">
                <div class="flex justify-between items-center mb-1">
                    <h6>Shipping Information</h6>
                    <router-link :to="{ name: 'ShippingDetails' }" class="cursor-pointer">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                        >
                            <path
                                opacity="0.4"
                                d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z"
                                fill="#445B54"
                            />
                            <path
                                opacity="0.4"
                                d="M15.8505 2.90005C14.2338 1.28338 12.6505 1.24172 10.9921 2.90005L9.9838 3.90838C9.90047 3.99172 9.86714 4.12505 9.90047 4.24172C10.5338 6.45005 12.3005 8.21672 14.5088 8.85005C14.5421 8.85838 14.5755 8.86672 14.6088 8.86672C14.7005 8.86672 14.7838 8.83338 14.8505 8.76672L15.8505 7.75838C16.6755 6.94172 17.0755 6.15005 17.0755 5.35005C17.0838 4.52505 16.6838 3.72505 15.8505 2.90005Z"
                                fill="#445B54"
                            />
                            <path
                                d="M13.0079 9.60841C12.7663 9.49175 12.5329 9.37508 12.3079 9.24175C12.1246 9.13341 11.9496 9.01675 11.7746 8.89175C11.6329 8.80008 11.4663 8.66675 11.3079 8.53341C11.2913 8.52508 11.2329 8.47508 11.1663 8.40841C10.8913 8.17508 10.5829 7.87508 10.3079 7.54175C10.2829 7.52508 10.2413 7.46675 10.1829 7.39175C10.0996 7.29175 9.95795 7.12508 9.83295 6.93341C9.73295 6.80841 9.61628 6.62508 9.50795 6.44175C9.37461 6.21675 9.25795 5.99175 9.14128 5.75841C9.02461 5.50841 8.93295 5.26675 8.84961 5.04175L3.61628 10.2751C3.50795 10.3834 3.40795 10.5917 3.38295 10.7334L2.93295 13.9251C2.84961 14.4917 3.00795 15.0251 3.35795 15.3834C3.65795 15.6751 4.07461 15.8334 4.52461 15.8334C4.62461 15.8334 4.72461 15.8251 4.82461 15.8084L8.02461 15.3584C8.17461 15.3334 8.38295 15.2334 8.48295 15.1251L13.7163 9.89175C13.4829 9.80841 13.2579 9.71675 13.0079 9.60841Z"
                                fill="#445B54"
                            />
                        </svg>
                    </router-link>
                </div>

                <p>{{ shippingDetails.name }}</p>
                <p>{{ shippingDetails.email }}</p>
                <p>{{ shippingDetails.phoneNumber }}</p>
            </div>

            <div>
                <div class="flex justify-between items-center mb-1">
                    <p class="text-manatee">Shipping Method</p>
                    <router-link :to="{ name: 'ShippingDetails' }" class="cursor-pointer">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                        >
                            <path
                                opacity="0.4"
                                d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z"
                                fill="#445B54"
                            />
                            <path
                                opacity="0.4"
                                d="M15.8505 2.90005C14.2338 1.28338 12.6505 1.24172 10.9921 2.90005L9.9838 3.90838C9.90047 3.99172 9.86714 4.12505 9.90047 4.24172C10.5338 6.45005 12.3005 8.21672 14.5088 8.85005C14.5421 8.85838 14.5755 8.86672 14.6088 8.86672C14.7005 8.86672 14.7838 8.83338 14.8505 8.76672L15.8505 7.75838C16.6755 6.94172 17.0755 6.15005 17.0755 5.35005C17.0838 4.52505 16.6838 3.72505 15.8505 2.90005Z"
                                fill="#445B54"
                            />
                            <path
                                d="M13.0079 9.60841C12.7663 9.49175 12.5329 9.37508 12.3079 9.24175C12.1246 9.13341 11.9496 9.01675 11.7746 8.89175C11.6329 8.80008 11.4663 8.66675 11.3079 8.53341C11.2913 8.52508 11.2329 8.47508 11.1663 8.40841C10.8913 8.17508 10.5829 7.87508 10.3079 7.54175C10.2829 7.52508 10.2413 7.46675 10.1829 7.39175C10.0996 7.29175 9.95795 7.12508 9.83295 6.93341C9.73295 6.80841 9.61628 6.62508 9.50795 6.44175C9.37461 6.21675 9.25795 5.99175 9.14128 5.75841C9.02461 5.50841 8.93295 5.26675 8.84961 5.04175L3.61628 10.2751C3.50795 10.3834 3.40795 10.5917 3.38295 10.7334L2.93295 13.9251C2.84961 14.4917 3.00795 15.0251 3.35795 15.3834C3.65795 15.6751 4.07461 15.8334 4.52461 15.8334C4.62461 15.8334 4.72461 15.8251 4.82461 15.8084L8.02461 15.3584C8.17461 15.3334 8.38295 15.2334 8.48295 15.1251L13.7163 9.89175C13.4829 9.80841 13.2579 9.71675 13.0079 9.60841Z"
                                fill="#445B54"
                            />
                        </svg>
                    </router-link>
                </div>

                <div class="flex justify-between items-center mt-2">
                    <p v-if="shippingDetails.shippingMethod === 'Delivery'">{{ shippingDetails.address }}</p>
                    <p v-else>{{ storeInfo.address }}</p>

                    <!-- delivery -->
                    <div
                        class="flex items-center text-granite-gray"
                        v-if="shippingDetails.shippingMethod === 'Delivery'"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 me-1"
                        >
                            <path
                                opacity="0.4"
                                d="M14.6663 9.33325V11.3333C14.6663 12.4399 13.773 13.3333 12.6663 13.3333H11.9997C11.9997 12.5999 11.3997 11.9999 10.6663 11.9999C9.93301 11.9999 9.33301 12.5999 9.33301 13.3333H6.66634C6.66634 12.5999 6.06634 11.9999 5.33301 11.9999C4.59967 11.9999 3.99967 12.5999 3.99967 13.3333H3.33301C2.22634 13.3333 1.33301 12.4399 1.33301 11.3333V9.33325H8.66634C9.39967 9.33325 9.99967 8.73325 9.99967 7.99992V3.33325H11.2264C11.7064 3.33325 12.1464 3.59326 12.3864 4.00659L13.5263 5.99992H12.6663C12.2997 5.99992 11.9997 6.29992 11.9997 6.66659V8.66659C11.9997 9.03325 12.2997 9.33325 12.6663 9.33325H14.6663Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M5.33333 14.6667C6.06971 14.6667 6.66667 14.0697 6.66667 13.3333C6.66667 12.597 6.06971 12 5.33333 12C4.59695 12 4 12.597 4 13.3333C4 14.0697 4.59695 14.6667 5.33333 14.6667Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M10.6663 14.6667C11.4027 14.6667 11.9997 14.0697 11.9997 13.3333C11.9997 12.597 11.4027 12 10.6663 12C9.92996 12 9.33301 12.597 9.33301 13.3333C9.33301 14.0697 9.92996 14.6667 10.6663 14.6667Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M14.6667 8.35335V9.33333H12.6667C12.3 9.33333 12 9.03333 12 8.66667V6.66667C12 6.3 12.3 6 12.6667 6H13.5267L14.4933 7.69332C14.6067 7.89332 14.6667 8.12002 14.6667 8.35335Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M9.33398 1.33325H4.00065C2.70065 1.33325 1.62066 2.26659 1.38733 3.49992H4.66732C4.94065 3.49992 5.16732 3.72659 5.16732 3.99992C5.16732 4.27325 4.94065 4.49992 4.66732 4.49992H1.33398V5.49992H3.33398C3.60732 5.49992 3.83398 5.72659 3.83398 5.99992C3.83398 6.27325 3.60732 6.49992 3.33398 6.49992H1.33398V7.49992H2.00065C2.27398 7.49992 2.50065 7.72659 2.50065 7.99992C2.50065 8.27325 2.27398 8.49992 2.00065 8.49992H1.33398V9.33325H8.66732C9.40065 9.33325 10.0007 8.73325 10.0007 7.99992V1.99992C10.0007 1.63325 9.70065 1.33325 9.33398 1.33325Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M1.387 3.5H0.666992C0.393659 3.5 0.166992 3.72667 0.166992 4C0.166992 4.27333 0.393659 4.5 0.666992 4.5H1.33366V4C1.33366 3.82667 1.35367 3.66 1.387 3.5Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M0.666992 5.5C0.393659 5.5 0.166992 5.72667 0.166992 6C0.166992 6.27333 0.393659 6.5 0.666992 6.5H1.33366V5.5H0.666992Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M0.666992 7.5C0.393659 7.5 0.166992 7.72667 0.166992 8C0.166992 8.27333 0.393659 8.5 0.666992 8.5H1.33366V7.5H0.666992Z"
                                fill="#5E646B"
                            />
                        </svg>
                        <p>Delivery</p>
                    </div>

                    <!-- pickup -->
                    <div class="flex items-center text-granite-gray" v-else>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="me-1 h-4 w-4"
                        >
                            <path
                                opacity="0.4"
                                d="M13.7467 5.63341C13.0467 2.55341 10.3601 1.16675 8.00006 1.16675C8.00006 1.16675 8.00006 1.16675 7.9934 1.16675C5.64006 1.16675 2.94673 2.54675 2.24673 5.62675C1.46673 9.06675 3.5734 11.9801 5.48006 13.8134C6.18673 14.4934 7.0934 14.8334 8.00006 14.8334C8.90673 14.8334 9.8134 14.4934 10.5134 13.8134C12.4201 11.9801 14.5267 9.07341 13.7467 5.63341Z"
                                fill="#5E646B"
                            />
                            <path
                                d="M8.00039 8.97344C9.16019 8.97344 10.1004 8.03324 10.1004 6.87344C10.1004 5.71364 9.16019 4.77344 8.00039 4.77344C6.84059 4.77344 5.90039 5.71364 5.90039 6.87344C5.90039 8.03324 6.84059 8.97344 8.00039 8.97344Z"
                                fill="#5E646B"
                            />
                        </svg>

                        <p>Pickup</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="h-43 shadow-[0px_-4px_8px_0px_#00000014] px-4 py-2.5">
            <div class="flex justify-between pb-1.5">
                <p class="text-granite-gray">
                    SubTotal ({{ totalProducts }} item<span v-if="totalProducts > 0">s</span>):
                </p>
                <p><small class="me-0.5">₦</small>{{ (cartTotal / 100).toLocaleString() }}<small>.00</small></p>
            </div>

            <div
                class="flex justify-between pb-3 border-b border-platinum"
                v-if="shippingDetails.shippingMethod === 'Delivery'"
            >
                <p class="text-granite-gray">Shipping ({{ shippingDetails.location }}):</p>
                <p><small class="me-0.5">₦</small>{{ deliveryFee.toLocaleString() }}<small>.00</small></p>
            </div>
            <div class="flex justify-between pb-3 border-b border-platinum" v-else>
                <p class="text-granite-gray">Pickup</p>
                <p><small class="me-0.5">₦</small>00<small>.00</small></p>
            </div>

            <div class="flex justify-between pt-2 font-bold">
                <p class="text-granite-gray">Total Amount:</p>
                <p class="text-feldgrau"><small class="me-0.5">₦</small>{{ totalAmount }}<small>.00</small></p>
            </div>
            <div class="flex justify-between py-3">
                <router-link :to="{ name: 'Store' }" class="w-[35%]">
                    <button class="w-full bg-anti-flash-white text-black py-3 rounded-md">Back to Shop</button>
                </router-link>
                <button class="w-[63%] bg-black text-white py-3 rounded-md" @click="checkout">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { Minus, Plus } from "lucide-vue-next";
import { useOrderStore } from "../stores/order";
import { useStoreInfo } from "../stores/storeInfo";
import { useCartStore } from "../stores/cart";
import { useApiCalls } from "../composables/useApiCalls";

const { shippingDetails, deliveryFee } = useOrderStore();
const { cart, cartLength, cartTotal } = useCartStore();
const { storeInfo } = useStoreInfo();
const { createOrder } = useApiCalls();
const { mutate: useCreateOrder, isPending, error } = createOrder();

const totalAmount = computed(() => {
    return (shippingDetails.shippingMethod === "Delivery" ? deliveryFee + cartTotal / 100 : cartTotal / 100).toLocaleString();
});

const totalProducts = computed(() => cart.reduce((sum, item) => sum + item.selected_quantity, 0));

const trimmedString = (string) => {
    if (string.length < 20) {
        return false;
    }
    return string.substring(0, 20);
};

const uniqueProductCount = () => {
    const uniqueIds = new Set(cart.map((item) => item.id));
    return uniqueIds.size;
};

const generateOrderRef = (storeId, cartItems) => {
    const refType = "1";
    const randInt = Math.floor(Math.random() * 9000) + 1000; // ensures it's 4-digit
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const cartCount = cartItems.length.toString().padStart(2, "0");
    const paddedStoreId = storeId.toString().padStart(4, "0");

    return `${refType}${paddedStoreId}${month}${day}${cartCount}${year}${randInt}`;
};
const variantNames = (product) => {
    const names = product.variants.split(",").filter(Boolean);
    return names.length ? names : ["", "", ""];
};

const orderRef = generateOrderRef(storeInfo.store, cart);
const orderDate = new Date().toISOString().split("T")[0];
const payloadItems = cart.map((item, i) => {
    return {
        has_feedback: false,
        index: 0,
        lead_time: 5,
        note: "",
        product: item.id,
        productid: item.id,
        var1name: variantNames(item)[0],
        var2name: variantNames(item)[1],
        // var3name: variantNames(item)[2],
        selected_option1: item.selected_variant1,
        selected_option2: item.selected_variant2,
        // selected_option3: item.selected_variant3,
        qty: item.selected_quantity,
        price_sold: item.variant_price ? item.variant_price : item.price,
        status: 1,
        sub_total: item.itemTotal,
        selected_position: i + 1,
        is_returned: false,
    };
});

const checkout = () => {
    const payload = {
        channel: 3,
        customer_info: {
            address: shippingDetails.address,
            email: shippingDetails.email,
            first_name: shippingDetails.name,
            last_name: "",
            line1: shippingDetails.address,
            phone: shippingDetails.phoneNumber,
            city: shippingDetails.location,
        },
        fulfilled: 0,
        has_customer: false,
        items_count: cartLength,
        order_ref: orderRef,
        order_date: orderDate,
        paid_amount: 0,
        payment_mode: 1,
        payment_status: 0,
        products_total: cartTotal,
        shipping_price: deliveryFee * 100,
        shipping_company: 0,
        shipping_mode: false,
        shipping_paid: false,
        store: storeInfo.store,
        total_amount: deliveryFee ? deliveryFee * 100 + cartTotal : cartTotal,
        unique_items: uniqueProductCount(),
        items: [...payloadItems],
    };

    console.log(payload);
    useCreateOrder(payload);
    if (isPending.value) {
        console.log("Order is being created...");
    } else if (error.value) {
        console.error("Error creating order:", error.value);
    } else {
        console.log("Order created successfully!");
    }
};
</script>
