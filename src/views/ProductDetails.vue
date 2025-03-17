<template>
    <div class="flex flex-col w-screen h-screen overflow-y-hidden">
        <Navbar />
        <section class="overflow-y-auto flex-1">
            <div
                class="p-4 last-of-type:min-h-185"
                v-for="filteredProduct in productStore.filteredProducts"
                :key="filteredProduct.id"
                :id="filteredProduct.id"
            >
                <div class="w-full h-100 rounded-lg">
                    <img
                        :src="filteredProduct.image"
                        alt="product image"
                        class="w-full h-full object-cover rounded-lg"
                    />
                </div>

                <div class="flex py-3 justify-between items-center">
                    <h5 class="font-normal max-w-[80%]">{{ filteredProduct.product_name }}</h5>
                    <div>
                        <button
                            class="rounded-full w-10 h-10 border-platinum border flex justify-center items-center cursor-pointer"
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

                <h5 v-if="price(filteredProduct) !== null">
                    <small class="me-0.5">N</small>{{ price(filteredProduct) }}<small>.00</small>
                </h5>
                <h5 v-else><small class="me-0.5">N</small>{{ filteredProduct.price }}<small>.00</small></h5>

                <Toast position="top-center" group="headless" @close="visible = false">
                    <template #container="{ message, closeCallback }">
                        <section class="w-full flex justify-center bg-transparent">
                            <div class="bg-white rounded-4xl py-2 px-2.5 w-8/12 border border-platinum">
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
                            price(filteredProduct) ? price(filteredProduct) : filteredProduct.price,
                            stock(filteredProduct) ? stock(filteredProduct) : filteredProduct.total_stock,
                        )
                    "
                    class="flex flex-col gap-4 w-full py-4"
                >
                    <div class="flex justify-between w-full gap-2">
                        <div v-if="variantNames(filteredProduct)[0]" class="flex flex-col gap-1 w-full">
                            <label for="variant1">{{ variantNames(filteredProduct)[0] }}</label>
                            <Select
                                v-model="formState[filteredProduct.id].variant1"
                                :options="options1Array(filteredProduct)"
                                name="variant1"
                                :placeholder="variantNames(filteredProduct)[0]"
                                class="w-full bg-white border rounded-md p-2"
                            />
                            <Message
                                v-if="$form.variant1?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                class="mt-1"
                                >{{ $form.variant1.error.message }}</Message
                            >
                        </div>

                        <div v-if="variantNames(filteredProduct)[1]" class="flex flex-col gap-1 w-full">
                            <label for="variant2">{{ variantNames(filteredProduct)[1] }}</label>
                            <Select
                                v-model="formState[filteredProduct.id].variant2"
                                :options="options2Array(filteredProduct)"
                                name="variant2"
                                :placeholder="variantNames(filteredProduct)[1]"
                                class="w-full bg-white border rounded-md p-2"
                            />
                            <Message
                                v-if="$form.variant2?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                class="mt-1"
                                >{{ $form.variant2.error.message }}</Message
                            >
                        </div>
                    </div>

                    <div class="text-lg font-semibold">
                        Stock:
                        {{
                            variantNames(filteredProduct).length ? stock(filteredProduct) : filteredProduct.total_stock
                        }}
                    </div>

                    <div class="flex gap-2">
                        <!-- <div class="flex flex-col gap-1 w-32">
                            <div class="flex gap-1.5 items-center pt-2 pb-2.5">
                                <button
                                    type="button"
                                    class="text-feldgrau bg-granite-gray/50 w-7 h-7 flex justify-center items-center rounded-md cursor-pointer"
                                    @click="
                                        increaseQuantity(
                                            filteredProduct.id,
                                            variantNames(filteredProduct).length
                                                ? stock(filteredProduct)
                                                : filteredProduct.total_stock,
                                        )
                                    "
                                >
                                    <Plus class="w-5 h-5" />
                                </button>
                                <InputNumber
                                    v-model="formState[filteredProduct.id].quantity"
                                    name="quantity"
                                    type="number"
                                    class="w-9 bg-anti-flash-white placeholder:text-manatee text-manatee rounded-sm border-0"
                                    fluid
                                    :min="1"
                                    :max="stock(filteredProduct)"
                                />
                                <button
                                    type="button"
                                    class="text-feldgrau bg-granite-gray/50 w-7 h-7 flex justify-center items-center rounded-md cursor-pointer"
                                    @click="decreaseQuantity(filteredProduct.id)"
                                >
                                    <Minus class="w-5 h-5" />
                                </button>
                            </div>
                            <Message
                                v-if="$form.quantity?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                class="text-center"
                                >{{ $form.quantity.error.message }}</Message
                            >
                        </div> -->
                        <Button
                            type="submit"
                            severity="secondary"
                            class="bg-black text-white h-13 w-full rounded-md cursor-pointer flex items-center"
                        >
                            <span v-if="!cartStore.getCartItemQuantity(filteredProduct, formState[filteredProduct.id])"
                                >Add to Basket</span
                            >
                            <span v-else
                                >{{ cartStore.getCartItemQuantity(filteredProduct, formState[filteredProduct.id]) }} in
                                Basket</span
                            >
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
        <div class="h-25 shadow-[0px_-4px_8px_0px_#00000014] p-4 flex items-center">
            <div class="flex justify-between items-center w-full">
                <div class="flex flex-col gap-2">
                    <p class="text-manatee">Sub Total ({{ cartStore.cart.length }}) item<span v-if="cartStore.cart.length">s</span></p>
                    <p class="text-feldgrau font-bold"><small>₦</small>{{ totalAmount.toLocaleString() }}<small>.00</small></p>
                </div>
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
                                v-if="cartStore.cart.length"
                            >
                                <small class="smaller">{{ cartStore.cart.length }}</small>
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
import { useStoreInfo } from "../composables/useStoreInfo";
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

const variantNames = (product) => {
    const names = product.variants.split(",").filter(Boolean);
    return names;
};

const options1Array = (product) => {
    const options = product.options1.split(",").filter(Boolean);
    return options;
};

const options2Array = (product) => {
    const options = product.options2.split(",").filter(Boolean);
    return options;
};

const combinationsArray = (product) => {
    const combinations = product.combinations
        .split(";")
        .map((combo) => {
            const parts = combo.split(",").map(Number);

            if (parts.length === 3) {
                // Single variant case
                const [index1, price, stock] = parts;
                return { index1, price, stock };
            } else if (parts.length === 4) {
                // Two variant case
                const [index1, index2, price, stock] = parts;
                return { index1, index2, price, stock };
            }

            return null; // Handle unexpected cases
        })
        .filter(Boolean);

    return combinations;
};

const price = (product) => {
    getInitialValues(product.id);
    const index1 = options1Array(product).indexOf(formState[product.id].variant1);
    const index2 = options2Array(product).indexOf(formState[product.id].variant2);

    const combinations = combinationsArray(product);

    const combination = combinations.find((c) => {
        if ("index2" in c) {
            // Two variant case
            return c.index1 === index1 && c.index2 === index2;
        } else {
            // Single variant case
            return c.index1 === index1;
        }
    });

    return combination ? combination.price : null;
};

const stock = (product) => {
    getInitialValues(product.id);
    const index1 = options1Array(product).indexOf(formState[product.id].variant1);
    const index2 = options2Array(product).indexOf(formState[product.id].variant2);

    const combinations = combinationsArray(product);

    const combination = combinations.find((c) => {
        if ("index2" in c) {
            // Two variant case
            return c.index1 === index1 && c.index2 === index2;
        } else {
            // Single variant case
            return c.index1 === index1;
        }
    });

    return combination ? combination.stock : null;
};

const formState = reactive({ default: { variant1: "", variant2: "", quantity: 1 } });

const getInitialValues = (productId) => {
    if (!formState[productId]) {
        formState[productId] = {
            variant1: "",
            variant2: "",
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

    return {
        errors,
        values,
    };
};

const increaseQuantity = (productId, stockLeft) => {
    if (formState[productId] && formState[productId].quantity < stockLeft) {
        formState[productId].quantity += 1;
    }
};

const decreaseQuantity = (productId) => {
    if (formState[productId] && formState[productId].quantity > 1) {
        formState[productId].quantity -= 1;
    }
};

const onFormSubmit = ({ valid, values }, product, variantPrice, stockLeft) => {
    if (valid && !visible.value && formState[product.id].quantity <= stockLeft) {
        toast.add({
            severity: "custom",
            life: 2000,
            group: "headless",
            styleClass: "w-full",
        });
        visible.value = true;

        cartStore.addToCart(product, formState[product.id], variantPrice, stockLeft);
        formState[product.id].quantity += 1;

        visible.value = false;
    } else {
        console.log('All available items in your cart');
    }
};

const totalAmount = computed(() => cartStore.cart.reduce((sum, item) => sum + (item.variant_price * item.selected_quantity), 0))
</script>
