<template>
    <div class="flex flex-col w-full h-screen overflow-y-hidden">
        <Navbar />
        <section class="overflow-y-auto flex-1">
            <div
                class="p-4 last-of-type:min-h-185"
                v-for="filteredProduct in productStore.filteredProducts"
                :key="filteredProduct.id"
                :id="filteredProduct.id"
            >
                <!-- product image  -->
                <div class="w-full h-100 rounded-lg">
                    <img
                        :src="
                            filteredProduct.images.length
                                ? filteredProduct.images[0].image
                                : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081'
                        "
                        alt="product image"
                        class="w-full h-full object-cover rounded-lg bg-granite-gray"
                    />
                </div>

                <div class="flex py-3 justify-between items-center">
                    <h5 class="font-normal max-w-[80%]">{{ filteredProduct.product_name }}</h5>
                    <div>
                        <button
                            class="rounded-full w-10 h-10 border-platinum border flex justify-center items-center cursor-pointer"
                            @click="shareUrl"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                class="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M12.1428 1.5H5.86532C3.13532 1.5 1.50781 3.1275 1.50781 5.8575V12.135C1.50781 14.865 3.13532 16.4925 5.86532 16.4925H12.1428C14.8728 16.4925 16.5003 14.865 16.5003 12.135V5.8575C16.5003 3.1275 14.8728 1.5 12.1428 1.5Z"
                                    fill="#000002"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.60225 4.48458C8.82192 4.26491 9.17808 4.26491 9.39775 4.48458L11.6477 6.73458C11.8674 6.95425 11.8674 7.3104 11.6477 7.53007C11.4281 7.74974 11.0719 7.74974 10.8523 7.53007L9 5.67782L7.14775 7.53007C6.92808 7.74974 6.57192 7.74974 6.35225 7.53007C6.13258 7.3104 6.13258 6.95425 6.35225 6.73458L8.60225 4.48458Z"
                                    fill="#000002"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9 4.31982C9.31066 4.31982 9.5625 4.57166 9.5625 4.88232V10.8823C9.5625 11.193 9.31066 11.4448 9 11.4448C8.68934 11.4448 8.4375 11.193 8.4375 10.8823V4.88232C8.4375 4.57166 8.68934 4.31982 9 4.31982Z"
                                    fill="#000002"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.96666 12.2042C4.06512 11.9095 4.3838 11.7505 4.67844 11.849C7.48023 12.7853 10.5201 12.7853 13.3219 11.849C13.6165 11.7505 13.9352 11.9095 14.0336 12.2042C14.1321 12.4988 13.9731 12.8175 13.6784 12.916C10.6452 13.9296 7.35508 13.9296 4.32186 12.916C4.02722 12.8175 3.86819 12.4988 3.96666 12.2042Z"
                                    fill="#000002"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <h5><small class="me-0.5">₦</small>{{ (price(filteredProduct)/100).toLocaleString() }}<small>.00</small></h5>
                <!-- <h5 v-else><small class="me-0.5">₦</small>{{ filteredProduct.price.toLocaleString() }}<small>.00</small></h5> -->

                <Toast position="top-center" group="headless" @close="visible = false">
                    <template #container="{ message, closeCallback }">
                        <section class="w-full flex justify-center bg-transparent">
                            <div class="bg-white rounded-4xl py-2 px-2.5 w-5/8 border border-platinum">
                                <div class="flex justify-between items-center">
                                    <div
                                        class="w-10 h-10 bg-anti-flash-white rounded-full flex justify-center items-center"
                                    >
                                        <div
                                            class="rounded-full w-6 h-6 flex justify-center items-center text-spanish-viridian bg-spanish-viridian/30"
                                        >
                                            <Check />
                                        </div>
                                    </div>
                                    <p class="pe-2">Item added to basket</p>
                                </div>
                            </div>
                        </section>
                    </template>
                </Toast>

                <Toast class="w-8/9 flex items-center" :visible="error" />

                <Form
                    v-slot="$form"
                    :initialValues="getInitialValues(filteredProduct.id)"
                    :resolver
                    :validateOnValueUpdate="true"
                    :validateOnBlur="false"
                    @submit="
                        onFormSubmit(
                            $event,
                            filteredProduct,
                            price(filteredProduct),
                            stock(filteredProduct)
                        )
                    "
                    class="flex flex-col gap-4 w-full py-4"
                >
                    <div class="flex flex-wrap w-full gap-2">
                        <div
                            v-for="(variant, index) in variantNames(filteredProduct)"
                            :key="index"
                            :class="[
                                'flex flex-col gap-1',
                                variantNames(filteredProduct).length === 1
                                    ? 'w-full'
                                    : variantNames(filteredProduct).length === 2
                                    ? 'w-[calc(50%-0.25rem)]'
                                    : index < 2
                                    ? 'w-[calc(50%-0.25rem)]'
                                    : 'w-full',
                            ]"
                        >
                            <label :for="`variant${index + 1}`">{{ variant }}</label>
                            <Select
                                v-model="formState[filteredProduct.id][`variant${index + 1}`]"
                                :options="optionsArray(filteredProduct[`options${index + 1}`])"
                                :name="`variant${index + 1}`"
                                :placeholder="variant"
                                class="bg-white border rounded-md p-2"
                            />
                            <Message
                                v-if="$form[`variant${index + 1}`]?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                class="mt-1"
                            >
                                {{ $form[`variant${index + 1}`].error.message }}
                            </Message>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <Button
                            type="submit"
                            severity="secondary"
                            class="bg-black text-white h-13 w-full rounded-md cursor-pointer flex items-center"
                        >
                            <span v-if="!cartStore.getCartItemQuantity(filteredProduct)">Add to Basket</span>
                            <span v-else>{{ cartStore.getCartItemQuantity(filteredProduct) }} in Basket</span>
                            <div class="relative">
                                <svg
                                    width="16"
                                    height="16"
                                    class="h-5 w-5"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.4"
                                        d="M12.8263 3.71988H12.5597L10.3063 1.46654C10.1263 1.28654 9.83301 1.28654 9.64634 1.46654C9.46634 1.64654 9.46634 1.93988 9.64634 2.12654L11.2397 3.71988H4.75967L6.35301 2.12654C6.53301 1.94654 6.53301 1.65321 6.35301 1.46654C6.17301 1.28654 5.87967 1.28654 5.69301 1.46654L3.44634 3.71988H3.17967C2.57967 3.71988 1.33301 3.71988 1.33301 5.42654C1.33301 6.07321 1.46634 6.49988 1.74634 6.77988C1.90634 6.94654 2.09967 7.03321 2.30634 7.07988C2.49967 7.12654 2.70634 7.13321 2.90634 7.13321H13.093C13.2997 7.13321 13.493 7.11988 13.6797 7.07988C14.2397 6.94654 14.6663 6.54654 14.6663 5.42654C14.6663 3.71988 13.4197 3.71988 12.8263 3.71988Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M13.1 7.13341H2.90664C2.70664 7.13341 2.49997 7.12674 2.30664 7.08008L3.14664 12.2001C3.33331 13.3467 3.83331 14.6667 6.05331 14.6667H9.79331C12.04 14.6667 12.44 13.5401 12.68 12.2801L13.6866 7.08008C13.5 7.12008 13.3 7.13341 13.1 7.13341ZM7.07331 11.4401C7.07331 11.7001 6.86664 11.9067 6.60664 11.9067C6.34664 11.9067 6.13997 11.7001 6.13997 11.4401V9.24008C6.13997 8.98008 6.34664 8.77341 6.60664 8.77341C6.86664 8.77341 7.07331 8.98008 7.07331 9.24008V11.4401ZM9.92664 11.4401C9.92664 11.7001 9.71997 11.9067 9.45997 11.9067C9.19997 11.9067 8.99331 11.7001 8.99331 11.4401V9.24008C8.99331 8.98008 9.19997 8.77341 9.45997 8.77341C9.71997 8.77341 9.92664 8.98008 9.92664 9.24008V11.4401Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </Button>
                    </div>
                </Form>
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
import Navbar from "../components/product/ProductNavbar.vue";
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

// const combinationsArray = (product) => {
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

        console.log('skuObject', skuObject);
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
