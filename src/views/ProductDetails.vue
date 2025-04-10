<template>
    <div class="flex flex-col w-full h-screen overflow-y-hidden">
        <Navbar />

        <ToastSuccess :visible="(visible = 'success')" @close="visible = false" :text="toastText" />

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
        <CartButton :totalProducts="totalProducts" />
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/product-details/ProductNavbar.vue";
import ToastSuccess from "../components/utils/ToastSuccess.vue";
import ProductVariantsForm from "../components/product-details/ProductVariantsForm.vue";
import ProductImage from "../components/product-details/ProductImage.vue";
import ProductInfo from "../components/product-details/ProductInfo.vue";
import CartButton from "../components/product-details/CartButton.vue";
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
const toastText = ref("");

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
        toastText.value = "Item added to cart";
        toast.add({
            severity: "custom",
            life: 2000,
            group: "headless",
            styleClass: "w-full",
        });
        visible.value = "success";
        cartStore.addToCart(product, formState[product.id], variantPrice, stockLeft);

        visible.value = false;
    } else {
        error.value = true;
        toast.add({ severity: "info", detail: "All available stock are in your cart", life: 1000 });
    }
};
</script>
