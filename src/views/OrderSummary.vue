<template>
    <div class="flex flex-col h-dvh w-full overflow-y-hidden">
        <div class="h-16 px-4 flex justify-between items-center">
            <h6 class="font-normal">Order Summary</h6>
            <router-link
                :to="{ name: 'Cart', params: { slug: currentSlug } }"
                class="underline text-spanish-viridian text-xs"
                >Edit All</router-link
            >
        </div>

        <div class="flex-1 overflow-y-auto px-4 pt-2 pb-4">
            <SummaryItem v-for="item in cart" :key="item.id" :item="item" />

            <ShippingSummary :shippingDetails="shippingDetails" />

            <ShippingMethod :shippingDetails="shippingDetails" :storeInfo="storeInfo" />
        </div>

        <SummaryTotal
            :total-products="totalProducts"
            :cart-total="cartTotal"
            :delivery-fee="deliveryFee"
            :total-amount="totalAmount"
            :shipping-details="shippingDetails"
            :is-pending="isPending"
            @checkout="handleCheckout"
        />
    </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { Minus, Plus } from "lucide-vue-next";
import { useOrderStore } from "../stores/order";
import { useStoreInfo } from "../stores/storeInfo";
import { useCartStore } from "../stores/cart";
import { useApiCalls } from "../composables/useApiCalls";
import { useUtils } from "../composables/useUtils";
import Spinner from "../components/utils/Spinner.vue";
import SummaryItem from "../components/order-summary/SummaryItem.vue";
import ShippingSummary from "../components/order-summary/ShippingSummary.vue";
import ShippingMethod from "../components/order-summary/ShippingMethod.vue";
import SummaryTotal from "../components/order-summary/SummaryTotal.vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const currentSlug = route.params.slug;
const toast = useToast();

const { shippingDetails, deliveryFee } = useOrderStore();
const { cart, cartLength } = useCartStore();
const { storeInfo } = useStoreInfo();
const { createOrder } = useApiCalls();
const { trimmedString } = useUtils();
const { mutate: useCreateOrder, isPending, error } = createOrder();

const cartTotal = computed(() => cart.reduce((sum, item) => sum + item.variant_price * item.selected_quantity, 0));
const totalAmount = computed(() => {
    return Number(
        shippingDetails.shippingMethod === "Delivery" ? deliveryFee + cartTotal.value : cartTotal.value,
    ).toLocaleString();
});

const totalProducts = computed(() => cart.reduce((sum, item) => sum + item.selected_quantity, 0));

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

const orderDate = new Date().toISOString().split("T")[0];

const payloadItems = cart.map((item, i) => {
    const variants = variantNames(item);
    const payloadItem = {
        has_feedback: false,
        index: i,
        lead_time: 5,
        note: "",
        product: item.id,
        productid: item.id,
        sku: item.selected_sku,
        qty: item.selected_quantity,
        price_sold: item.variant_price || item.price,
        status: 1,
        sub_total: item.itemTotal,
        selected_position: i + 1,
        is_returned: false,
    };

    variants.forEach((variantName, index) => {
        payloadItem[`var${index + 1}name`] = variantName;
        payloadItem[`selected_option${index + 1}`] = item[`selected_variant${index + 1}`];
    });

    return payloadItem;
});

const handleCheckout = () => {
    const orderRef = generateOrderRef(storeInfo.store, cart);
    const payload = {
        channel: 3,
        customer_info: {
            address: shippingDetails.address,
            email: shippingDetails.email,
            first_name: shippingDetails.firstName,
            last_name: shippingDetails.lastName,
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
        products_total: cartTotal.value,
        shipping_price: shippingDetails.shippingMethod === "Delivery" ? deliveryFee : 0,
        shipping_company: 0,
        shipping_mode: false,
        shipping_paid: false,
        store: storeInfo.store,
        total_amount: shippingDetails.shippingMethod === "Delivery" ? deliveryFee + cartTotal.value : cartTotal.value,
        unique_items: uniqueProductCount(),
        items: [...payloadItems],
        redirect_url: `${window.location.origin}/${currentSlug}/store/order-successful/${orderRef}`,
    };

    console.log(payload);
    useCreateOrder(payload, {
        onError: (error) => {
            console.error("Create order failed:", error);

            const message = error?.response?.data?.message || error?.message || "An error occurred";

            toast.add({
                severity: "error",
                detail: message,
                life: 1000,
            });
        },
    });
};
</script>
