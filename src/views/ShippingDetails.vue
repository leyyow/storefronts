<template>
    <div class="flex flex-col h-screen">
        <div class="px-4 pb-2 pt-4 flex flex-col flex-1 overflow-y-auto">
            <h5 class="font-normal py-2">Shipping Details</h5>
            <p class="text-granite-gray">Kindly input your information</p>

            <div class="flex flex-col gap-5 w-full mt-5 flex-1">
                <div class="flex flex-col gap-5 w-full flex-1 min-h-0">
                    <div class="flex gap-2">
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="firstName" class="mb-1">First Name <span class="text-red-500">*</span></label>
                            <input
                                id="firstName"
                                v-model="initialValues.firstName"
                                type="text"
                                placeholder="eg: Daniel"
                                class="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spanish-viridian w-full"
                                :class="{ 'border-red-500': errors.firstName }"
                                @blur="validateField('firstName')"
                            />
                            <div v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</div>
                        </div>

                        <div class="flex flex-col gap-1 flex-1">
                            <label for="lastName" class="mb-1">Last Name <span class="text-red-500">*</span></label>
                            <input
                                id="lastName"
                                v-model="initialValues.lastName"
                                type="text"
                                placeholder="eg: Obode"
                                class="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spanish-viridian w-full"
                                :class="{ 'border-red-500': errors.lastName }"
                                @blur="validateField('lastName')"
                            />
                            <div v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="email" class="mb-1">Email <span class="text-red-500">*</span></label>
                        <input
                            id="email"
                            v-model="initialValues.email"
                            type="email"
                            placeholder="example@gmail.com"
                            class="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spanish-viridian"
                            :class="{ 'border-red-500': errors.email }"
                            @blur="validateField('email')"
                            @input="validateField('email')"
                        />
                        <div v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="phoneNumber" class="mb-1">Phone Number <span class="text-red-500">*</span></label>
                        <input
                            id="phoneNumber"
                            v-model="initialValues.phoneNumber"
                            type="text"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter phone number"
                            class="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spanish-viridian"
                            :class="{ 'border-red-500': errors.phoneNumber }"
                            @input="handlePhoneInput"
                            @blur="validateField('phoneNumber')"
                        />
                        <div v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</div>
                    </div>

                    <div>
                        <h6 class="my-3 font-normal">Shipping Method <span class="text-red-500">*</span></h6>
                        <div class="flex gap-3">
                            <label
                                for="Delivery"
                                :class="[
                                    'w-full cursor-pointer p-3 rounded-md bg-anti-flash-white block border',
                                    storeInfo.enable_shipping
                                        ? 'opacity-100 cursor-pointer'
                                        : 'opacity-50 cursor-default',
                                    initialValues.shippingMethod === 'Delivery'
                                        ? 'border-spanish-viridian bg-spanish-viridian/5'
                                        : 'border-transparent',
                                ]"
                            >
                                <div class="flex justify-between items-center">
                                    <span>Delivery</span>
                                    <input
                                        id="Delivery"
                                        v-model="initialValues.shippingMethod"
                                        type="radio"
                                        name="shippingMethod"
                                        value="Delivery"
                                        :disabled="!storeInfo.enable_shipping"
                                        @change="onShippingMethodChange"
                                        class="text-spanish-viridian focus:ring-spanish-viridian"
                                    />
                                </div>
                                <div class="flex items-center gap-1 mt-2">
                                    <p class="text-granite-gray leading-none text-xs">Powered by</p>
                                    <img
                                        src="../assets/images/pngs/shipbubble-logo.png"
                                        alt="shipbubble logo"
                                        class="h-3"
                                    />
                                </div>
                            </label>

                            <label
                                for="Pickup"
                                :class="[
                                    'w-full p-3 rounded-md bg-anti-flash-white block border',
                                    storeInfo.pickup_location === ''
                                        ? 'opacity-50 cursor-default'
                                        : 'opacity-100 cursor-pointer',
                                    initialValues.shippingMethod === 'Pickup'
                                        ? 'border-spanish-viridian bg-spanish-viridian/5'
                                        : 'border-transparent',
                                ]"
                            >
                                <div class="flex justify-between items-center">
                                    <span>Pickup</span>
                                    <input
                                        id="Pickup"
                                        v-model="initialValues.shippingMethod"
                                        type="radio"
                                        name="shippingMethod"
                                        value="Pickup"
                                        :disabled="storeInfo.pickup_location === ''"
                                        @change="onShippingMethodChange"
                                        class="text-spanish-viridian focus:ring-spanish-viridian"
                                    />
                                </div>
                                <p class="text-granite-gray leading-none text-xs mt-2">
                                    Pick up your order at your convenience
                                </p>
                            </label>
                        </div>
                        <div v-if="errors.shippingMethod" class="text-red-500 text-sm mt-1">
                            {{ errors.shippingMethod }}
                        </div>
                    </div>

                    <div class="flex flex-col gap-1" v-if="initialValues.shippingMethod === 'Delivery'">
                        <label for="address" class="mb-1 hidden">Address</label>
                        <GooglePlacesAutocomplete
                            v-model="initialValues.address"
                            label="Address"
                            placeholder="Enter your address..."
                            :required="true"
                            @selected="onAddressSelected"
                            @blur="validateField('address')"
                        />
                        <div v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</div>
                    </div>

                    <div
                        v-if="
                            initialValues.address.length > 0 &&
                            initialValues.shippingMethod === 'Delivery' &&
                            !isGettingRates
                        "
                        class="mt-3 pt-3 bg-[#F2F5F2] rounded-t-md"
                    >
                        <p v-if="shippingOptions.length > 0" class="py-2 text-center">Select your preferred courier</p>
                        <div class="my-2">
                            <div class="max-h-70 overflow-y-auto overflow-x-hidden scrollbar-hide px-2 relative">
                                <NoCouriersAvailable v-if="shippingOptions.length === 0" />
                                <label
                                    v-else
                                    class="bg-white border flex justify-between py-3 cursor-pointer px-2 rounded-2xl mb-2 items-center"
                                    :class="[
                                        initialValues.courier_id === String(option.courier_id)
                                            ? 'border-spanish-viridian bg-spanish-viridian/5'
                                            : 'border-platinum',
                                    ]"
                                    v-for="option in shippingOptions"
                                    :key="String(option.courier_id)"
                                    :for="String(option.courier_id)"
                                    @click="selectCourier(option)"
                                >
                                    <div class="flex">
                                        <img
                                            :src="option.courier_image"
                                            alt="courier logo"
                                            class="w-10 border border-gray-200 rounded-md"
                                        />

                                        <div class="flex-1 flex flex-col justify-between ms-2">
                                            <p class="text-xs font-bold text-black">{{ option.courier_name }}</p>
                                            <div class="flex text-[#838383] items-center relative">
                                                <Icon icon="mdi:star-outline" class="relative bottom-0.5" />
                                                <p class="text-[10px] ms-0.5">{{ option.tracking.bars }}</p>
                                                <p class="text-[10px] ms-1">({{ option.votes }} reviews)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        :id="String(option.courier_id)"
                                        v-model="initialValues.courier_id"
                                        type="radio"
                                        name="courier_id"
                                        :value="String(option.courier_id)"
                                        class="sr-only"
                                    />
                                    <p class="font-bold" v-html="formatNaira(option.total_amount)"></p>
                                </label>
                            </div>
                            <div
                                class="w-full border-y border-[#D83854] bg-[#D83854]/5 py-3 flex gap-1 justify-center items-center"
                            >
                                <p class="text-xs">This service is provided by</p>
                                <img
                                    src="../assets/images/pngs/shipbubble-logo.png"
                                    alt="shipbubble logo"
                                    class="h-3"
                                />
                            </div>
                            <div v-if="errors.courier_id" class="text-red-500 text-sm mt-1 ms-2">
                                {{ errors.courier_id }}
                            </div>
                        </div>
                    </div>

                    <!-- Loading state for rates -->
                    <div
                        v-if="isGettingRates && initialValues.shippingMethod === 'Delivery'"
                        class="mt-3 pt-3 bg-[#F2F5F2] rounded-t-md"
                    >
                        <div class="my-2">
                            <div class="max-h-70 overflow-y-auto overflow-x-hidden scrollbar-hide px-2 relative">
                                <div role="status" class="w-full flex justify-center items-center p-10">
                                    <div
                                        class="animate-spin rounded-full h-16 w-16 border-b-2 border-spanish-viridian"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="initialValues.shippingMethod === 'Pickup'">
                        <p><span class="font-bold">Pickup at:</span> {{ storeInfo.pickup_location }}</p>
                    </div>
                </div>
            </div>
        </div>

        <button
            type="button"
            @click="handleSubmit"
            class="py-3 bg-black text-white mx-4 my-2 rounded-md hover:bg-gray-800 transition-colors"
        >
            Next
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { useOrderStore } from "../stores/order";
import { useStoreInfo } from "../stores/storeInfo";
import { useRouter } from "vue-router";
import { useUtils } from "../composables/useUtils";
import GooglePlacesAutocomplete from "../components/common/google-places-auto-complete.vue";
import { useApiCalls } from "../composables/useApiCalls";
import { useCartStore } from "../stores/cart";
import type { ShippingOption, StoreInfo } from "../includes/interfaces";
import NoCouriersAvailable from "../components/common/NoCouriersAvailable.vue";
import { Icon } from "@iconify/vue";

const router = useRouter();
const { shippingDetails: initialValues } = useOrderStore();
const storeInfo = useStoreInfo().storeInfo as StoreInfo;
const requestToken = ref<string>("");

const { formatNaira } = useUtils();
const { cart } = useCartStore();
const { getRates } = useApiCalls();
const shippingOptions = computed(() => useStoreInfo().shippingOptions as ShippingOption[]);
const { mutate: getRatesMutation, isPending: isGettingRates } = getRates();

// Validation errors state
const errors = reactive<Record<string, string>>({});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handlePhoneInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
        const numericValue = target.value.replace(/\D/g, "");
        initialValues.phoneNumber = numericValue;
        target.value = numericValue;
    }
}

function validateField(fieldName: string) {
    // Clear previous error
    delete errors[fieldName];

    switch (fieldName) {
        case "firstName":
            if (!initialValues.firstName?.trim()) {
                errors.firstName = "First name is required.";
            }
            break;
        case "lastName":
            if (!initialValues.lastName?.trim()) {
                errors.lastName = "Last name is required.";
            }
            break;
        case "email":
            if (!initialValues.email?.trim()) {
                errors.email = "Email is required.";
            } else if (!emailRegex.test(initialValues.email)) {
                errors.email = "Please enter a valid email address.";
            }
            break;
        case "phoneNumber":
            if (!initialValues.phoneNumber?.trim()) {
                errors.phoneNumber = "Phone number is required.";
            } else if (initialValues.phoneNumber.length < 10) {
                errors.phoneNumber = "Phone number must be at least 10 digits.";
            }
            break;
        case "shippingMethod":
            if (!initialValues.shippingMethod) {
                errors.shippingMethod = "Shipping method is required.";
            }
            break;
        case "address":
            if (initialValues.shippingMethod === "Delivery" && !initialValues.address?.trim()) {
                errors.address = "Address is required.";
            }
            break;
        case "courier_id":
            if (initialValues.shippingMethod === "Delivery" && !initialValues.courier_id) {
                errors.courier_id = "Courier is required.";
            }
            break;
    }
}

function validateAllFields(): boolean {
    // Clear all errors first
    Object.keys(errors).forEach((key) => delete errors[key]);

    // Validate all required fields
    validateField("firstName");
    validateField("lastName");
    validateField("email");
    validateField("phoneNumber");
    validateField("shippingMethod");

    if (initialValues.shippingMethod === "Delivery") {
        validateField("address");
        validateField("courier_id");
    }

    return Object.keys(errors).length === 0;
}

function onShippingMethodChange() {
    // Clear shipping method error when user selects an option
    delete errors.shippingMethod;

    if (initialValues.shippingMethod === "Pickup") {
        // Clear delivery-related fields
        initialValues.address = "";
        initialValues.courier_id = "";
        initialValues.courier = {};
        initialValues.rate = "";
        requestToken.value = "";

        // Clear delivery-related errors
        delete errors.address;
        delete errors.courier_id;

        // Clear shipping options in store
        useStoreInfo().shippingOptions = [];
    }
}

function onAddressSelected(item: any) {
    initialValues.address = item.description;
    delete errors.address; // Clear address error when selected

    // Clear previous address-related selections
    initialValues.courier_id = "";
    initialValues.courier = {};
    initialValues.rate = "";
    requestToken.value = "";
    delete errors.courier_id;

    // Clear shipping options in store
    useStoreInfo().shippingOptions = [];

    console.log("Selected address:", item);

    // Call rates API only when address is selected from dropdown
    if (
        initialValues.shippingMethod === "Delivery" &&
        initialValues.firstName &&
        initialValues.lastName &&
        initialValues.phoneNumber &&
        initialValues.email
    ) {
        fetchShippingRates();
    }
}

function selectCourier(option: ShippingOption) {
    initialValues.courier_id = String(option.courier_id);
    initialValues.courier = option;
    initialValues.rate = requestToken.value;
    delete errors.courier_id; // Clear courier error when selected
    console.log("Selected courier:", option);
}

function fetchShippingRates() {
    // Create sku_data as key-value pairs: { sku_id: quantity }
    const skuData: Record<string, number> = {};
    cart.forEach((item) => {
        skuData[item.selected_sku] = item.selected_quantity;
    });

    getRatesMutation(
        {
            delivery_address: initialValues.address,
            customer_name: `${initialValues.firstName} ${initialValues.lastName}`,
            customer_phone: initialValues.phoneNumber,
            customer_email: initialValues.email,
            sku_data: skuData,
        },
        {
            onSuccess: (response) => {
                requestToken.value = response.rates.request_token;
                console.log("Shipping rates fetched successfully:", response);
            },
            onError: (error) => {
                console.error("Error fetching shipping rates:", error);
            },
        },
    );
}

function handleSubmit() {
    if (validateAllFields()) {
        // Clear delivery-related fields if pickup is selected
        if (initialValues.shippingMethod === "Pickup") {
            initialValues.address = "";
            initialValues.courier_id = "";
            initialValues.courier = {};
            initialValues.rate = "";
        }
        router.push({ name: "OrderSummary" });
    }
}

// Remove the watch function that was causing multiple API calls
// The rates API will now only be called from onAddressSelected
</script>
