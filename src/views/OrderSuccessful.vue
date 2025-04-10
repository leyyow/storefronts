<template>
    <div class="flex flex-col h-dvh w-full overflow-y-hidden">
        <div class="flex-1 overflow-y-auto flex justify-center items-center">
            <div class="flex flex-col items-center text-center p-4">
                <ToastSuccess :visible="(visible = 'success')" @close="visible = false" :text="toastText" />

                <img src="../assets/order-successful.png" alt="carboard box gif" />

                <h6 class="py-3">Order placed successfully</h6>

                <p class="text-granite-gray">
                    Your order has been placed, and confirmation has been sent to
                    <span class="text-feldgrau font-bold">{{ shippingDetails.email }}</span
                    >. Please note your order number for reference.
                </p>

                <div
                    class="rounded-md border border-platinum px-2 py-1 flex items-center justify-between w-full text-granite-gray mt-3"
                >
                    <p>Order Number</p>
                    <div class="flex gap-1 items-center">
                        <p class="font-bold">#{{ orderId }}</p>
                        <button class="cursor-pointer" @click="copy">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                            >
                                <path
                                    d="M10.6673 8.59992V11.3999C10.6673 13.7333 9.73398 14.6666 7.40065 14.6666H4.60065C2.26732 14.6666 1.33398 13.7333 1.33398 11.3999V8.59992C1.33398 6.26659 2.26732 5.33325 4.60065 5.33325H7.40065C9.73398 5.33325 10.6673 6.26659 10.6673 8.59992Z"
                                    fill="#445B54"
                                />
                                <path
                                    opacity="0.4"
                                    d="M11.3998 1.33325H8.59984C6.29984 1.33325 5.36651 2.24659 5.33984 4.49992H7.39984C10.1998 4.49992 11.4998 5.79992 11.4998 8.59992V10.6599C13.7532 10.6333 14.6665 9.69992 14.6665 7.39992V4.59992C14.6665 2.26659 13.7332 1.33325 11.3998 1.33325Z"
                                    fill="#445B54"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-20 p-4 flex flex-col gap-2">
            <router-link :to="{ name: 'Store' }">
                <button class="w-full bg-black text-white py-3 rounded-md">Back to Shop</button>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useOrderStore } from "../stores/order";
import { onMounted, ref } from "vue";
import ToastSuccess from "../components/utils/ToastSuccess.vue";
import { useQueryClient } from "@tanstack/vue-query";

onMounted(() => {
    useCartStore().clearCart();
    const queryClient = useQueryClient();
    queryClient.refetchQueries({ queryKey: ["storeInfo"] });
});

const route = useRoute();
const orderId = route.params.id;
const { shippingDetails } = useOrderStore();
const toastText = ref("");
const toast = useToast();

const copy = () => {
    navigator.clipboard
        .writeText(`#${orderId}`)
        .then(() => {
            toastText.value = "Order Reference copied to clipboard!";
            toast.add({
                severity: "custom",
                life: 2000,
                group: "headless",
                styleClass: "w-full",
            });
            visible.value = "success";
        })
        .catch((err) => {
            toast.add({ severity: "error", summary: "Error", detail: "Failed to copy Order ID" });
        });
};
</script>
<style lang=""></style>
