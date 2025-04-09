<template>
    <div class="flex flex-col w-full h-screen overflow-y-hidden">
        <Navbar />

        <ToastSuccess :visible="visible" @close="visible = false" />

        <Toast class="w-8/9 flex items-center" :visible="error" />

        <section class="overflow-y-auto flex-1">
            <div
                class="p-4 last-of-type:min-h-185"
                v-for="filteredProduct in productStore.filteredProducts"
                :key="filteredProduct.id"
                :id="filteredProduct.id"
            >
                <!-- product image  -->
                <ProductImage :filteredProduct="filteredProduct" />

                <ProductInfo :filteredProduct="filteredProduct" :shareUrl="shareUrl" />

                <ProductVariantsForm
                    :filteredProduct="filteredProduct"
                    :formState="formState"
                    :cartStore="cartStore"
                    :resolver="resolver"
                    :getInitialValues="getInitialValues"
                    :variantNames="variantNames"
                    :optionsArray="optionsArray"
                    :price="price"
                    :stock="stock"
                    :onFormSubmit="onFormSubmit"
                />
            </div>
        </section>
        <!--  -->
        <div class="h-15 shadow-[0px_-4px_8px_0px_#00000014] p-4 flex items-center">
            <div class="flex justify-end items-center w-full">
                <div class="w-10 h-10">
                    <router-link :to="{ name: 'Cart' }">
                        <button
                            class="bg-anti-flash-white rounded-sm w-full h-full flex items-center justify-center cursor-pointer relative"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-7 w-7"
                            >
                                <path
                                    opacity="0.4"
                                    d="M12.8263 3.71988H12.5597L10.3063 1.46654C10.1263 1.28654 9.83301 1.28654 9.64634 1.46654C9.46634 1.64654 9.46634 1.93988 9.64634 2.12654L11.2397 3.71988H4.75967L6.35301 2.12654C6.53301 1.94654 6.53301 1.65321 6.35301 1.46654C6.17301 1.28654 5.87967 1.28654 5.69301 1.46654L3.44634 3.71988H3.17967C2.57967 3.71988 1.33301 3.71988 1.33301 5.42654C1.33301 6.07321 1.46634 6.49988 1.74634 6.77988C1.90634 6.94654 2.09967 7.03321 2.30634 7.07988C2.49967 7.12654 2.70634 7.13321 2.90634 7.13321H13.093C13.2997 7.13321 13.493 7.11988 13.6797 7.07988C14.2397 6.94654 14.6663 6.54654 14.6663 5.42654C14.6663 3.71988 13.4197 3.71988 12.8263 3.71988Z"
                                    fill="#445B54"
                                />
                                <path
                                    d="M13.1 7.13341H2.90664C2.70664 7.13341 2.49997 7.12674 2.30664 7.08008L3.14664 12.2001C3.33331 13.3467 3.83331 14.6667 6.05331 14.6667H9.79331C12.04 14.6667 12.44 13.5401 12.68 12.2801L13.6866 7.08008C13.5 7.12008 13.3 7.13341 13.1 7.13341ZM7.07331 11.4401C7.07331 11.7001 6.86664 11.9067 6.60664 11.9067C6.34664 11.9067 6.13997 11.7001 6.13997 11.4401V9.24008C6.13997 8.98008 6.34664 8.77341 6.60664 8.77341C6.86664 8.77341 7.07331 8.98008 7.07331 9.24008V11.4401ZM9.92664 11.4401C9.92664 11.7001 9.71997 11.9067 9.45997 11.9067C9.19997 11.9067 8.99331 11.7001 8.99331 11.4401V9.24008C8.99331 8.98008 9.19997 8.77341 9.45997 8.77341C9.71997 8.77341 9.92664 8.98008 9.92664 9.24008V11.4401Z"
                                    fill="#445B54"
                                />
                            </svg>
                            <div
                                class="py-1 px-1.5 bg-lava flex items-center justify-center rounded-sm text-white absolute top-1 right-1"
                                v-if="totalProducts"
                            >
                                <small class="smaller">{{ totalProducts }}</small>
                            </div>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/product-details/ProductNavbar.vue";
import ToastSuccess from "../components/product-details/ToastSuccess.vue";
import ProductVariantsForm from "../components/product-details/ProductVariantsForm.vue";
import ProductImage from "../components/product-details/ProductImage.vue";
import ProductInfo from "../components/product-details/ProductInfo.vue";
import { useProductStore } from "../stores/product";
import { useStoreInfo } from "../stores/storeInfo";
import { useToast } from "primevue/usetoast";
import { Minus, Plus, Check } from "lucide-vue-next";
import { useCartStore } from "../stores/cart";

const route = useRoute();
const productId = ref(route.params.id);
const productStore = useProductStore();
const cartStore = useCartStore();
const { storeInfo } = useStoreInfo();
const toast = useToast();

const visible = ref(false);
const error = ref(false);
const formState = reactive({ default: { variant1: "", variant2: "", quantity: 1 } });

const totalAmount = computed(() =>
    cartStore.cart.reduce((sum, item) => sum + item.variant_price * item.selected_quantity, 0),
);

const totalProducts = computed(() => cartStore.cart.reduce((sum, item) => sum + item.selected_quantity, 0));

const variantNames = (product) => {
    const names = product.variants.split(",").filter(Boolean);
    return names;
};

const optionsArray = (option) => {
    const options = option.split(",").filter(Boolean);
    return options;
};
//     const combinations = product.combinations
//         .split(";")
//         .map((combo) => {
//             const parts = combo.split(",").map(Number);

//             if (parts.length === 3) {
//                 // Single variant case
//                 const [index1, price, stock] = parts;
//                 return { index1, price, stock };
//             } else if (parts.length === 4) {
//                 // Two variant case
//                 const [index1, index2, price, stock] = parts;
//                 return { index1, index2, price, stock };
//             }

//             return null; // Handle unexpected cases
//         })
//         .filter(Boolean);

//     return combinations;
// };

const price = (product) => {
    getInitialValues(product.id);
    let skuObject = null;

    if (variantNames(product).length) {
        skuObject = product.sku.find((item) => {
            return (
                item.option1 === formState[product.id].variant1 &&
                item.option2 === formState[product.id].variant2 &&
                item.option3 === formState[product.id].variant3
            );
        });
    }

    return skuObject ? skuObject.price : product.price;
};

const stock = (product) => {
    getInitialValues(product.id);
    let skuObject = null;

    if (variantNames(product).length) {
        skuObject = (product.sku || []).find((item) => {
            return (
                item.option1 === formState[product.id].variant1 &&
                item.option2 === formState[product.id].variant2 &&
                item.option3 === formState[product.id].variant3
            );
        });

        console.log("skuObject", skuObject);
    }

    return skuObject ? skuObject.qty : product.total_stock;
};

const getInitialValues = (productId) => {
    if (!formState[productId]) {
        formState[productId] = {
            variant1: "",
            variant2: "",
            variant3: "",
            quantity: 1,
        };
    }
    return formState[productId];
};

const resolver = ({ values }) => {
    const errors = {};

    if (!values.variant1) {
        errors.variant1 = [{ message: "This field is required." }];
    }

    if (!values.variant2) {
        errors.variant2 = [{ message: "This field is required." }];
    }

    if (!values.variant3) {
        errors.variant3 = [{ message: "This field is required." }];
    }

    return {
        errors,
        values,
    };
};

const shareUrl = () => {
    if (navigator.share) {
        navigator
            .share({
                title: document.title,
                url: window.location.href,
            })
            .then(() => console.log("Successfully shared"))
            .catch((error) => console.error("Error sharing", error));
    } else {
        console.error("Web Share API not supported in this browser");
    }
};

const onFormSubmit = ({ valid, values }, product, variantPrice, stockLeft) => {
    console.log(cartStore.isInStock(product, formState[product.id], stockLeft));

    if (stockLeft === 0) {
        error.value = true;
        toast.add({ severity: "info", detail: "Item is not available in stock", life: 1000 });
        return;
    } else if (valid && cartStore.isInStock(product, formState[product.id], stockLeft)) {
        toast.add({
            severity: "custom",
            life: 2000,
            group: "headless",
            styleClass: "w-full",
        });
        visible.value = true;
        cartStore.addToCart(product, formState[product.id], variantPrice, stockLeft);

        visible.value = false;
    } else {
        error.value = true;
        toast.add({ severity: "info", detail: "All available stock are in your cart", life: 1000 });
    }
};
</script>
