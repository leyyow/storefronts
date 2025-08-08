<template>
    <div class="px-4 pb-2 pt-4 flex flex-col min-h-screen">
        <h5 class="font-normal py-2">Shipping Details</h5>
        <p class="text-granite-gray">Kindly input your information</p>

        <Form
            v-slot="$form"
            :initialValues
            :resolver
            :validateOnValueUpdate="false"
            :validateOnBlur="true"
            @submit="onFormSubmit"
            class="flex flex-col gap-5 w-full mt-5"
        >
            <div class="flex flex-col gap-5 w-full">
                <div class="flex gap-2">
                    <div class="flex flex-col gap-1">
                        <label for="firstName" class="mb-1">First Name <span class="text-red-500">*</span></label>
                        <InputText
                            v-model="initialValues.firstName"
                            name="firstName"
                            type="text"
                            placeholder="eg: Daniel"
                            fluid
                            class="px-4 py-3"
                        />
                        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{
                            $form.firstName.error.message
                        }}</Message>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="lastName" class="mb-1">Last Name <span class="text-red-500">*</span></label>
                        <InputText
                            v-model="initialValues.lastName"
                            name="lastName"
                            type="text"
                            placeholder="eg: Obode"
                            fluid
                            class="px-4 py-3"
                        />
                        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{
                            $form.lastName.error.message
                        }}</Message>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email" class="mb-1">Email <span class="text-red-500">*</span></label>
                    <InputText
                        v-model="initialValues.email"
                        name="email"
                        type="text"
                        placeholder="example@gmail.com"
                        fluid
                        class="px-4 py-3"
                        :formControl="{ validateOnValueUpdate: true }"
                    />
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                        $form.email.error.message
                    }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="phoneNumber" class="mb-1">Phone Number <span class="text-red-500">*</span></label>
                    <input
                        v-model="initialValues.phoneNumber"
                        type="text"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter phone number"
                        @input="(e) => { const target = e.target as HTMLInputElement; if (target) initialValues.phoneNumber = target.value.replace(/\D/g, ''); }"
                        class="p-3 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple">{{
                        $form.phoneNumber.error.message
                    }}</Message>
                </div>

                <div>
                    <h6 class="my-3 font-normal">Shipping Method <span class="text-red-500">*</span></h6>
                    <div class="flex gap-3">
                        <label
                            for="Delivery"
                            :class="[
                                'w-full cursor-pointer p-3 rounded-md bg-anti-flash-white block border',
                                initialValues.shippingMethod === 'Delivery'
                                    ? 'border-spanish-viridian bg-spanish-viridian/5'
                                    : 'border-transparent',
                            ]"
                        >
                            <div class="flex justify-between items-center">
                                <span>Delivery</span>
                                <RadioButton
                                    v-model="initialValues.shippingMethod"
                                    inputId="Delivery"
                                    name="shippingMethod"
                                    value="Delivery"
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
                            class="w-full p-3 rounded-md bg-anti-flash-white block"
                            :class="{
                                'opacity-50 cursor-default': storeInfo.pickup_location === '',
                                'opacity-100 cursor-pointer': storeInfo.pickup_location !== '',
                            }"
                        >
                            <div class="flex justify-between items-center">
                                <span>Pickup</span>
                                <RadioButton
                                    v-model="initialValues.shippingMethod"
                                    inputId="Pickup"
                                    name="shippingMethod"
                                    value="Pickup"
                                    :disabled="storeInfo.pickup_location === ''"
                                />
                            </div>
                            <p class="text-granite-gray leading-none text-xs mt-2">
                                Pick up your order at your convenience
                            </p>
                        </label>
                    </div>
                    <Message
                        v-if="$form.shippingMethod?.invalid"
                        severity="error"
                        class="mt-1"
                        size="small"
                        variant="simple"
                        >{{ $form.shippingMethod.error.message }}</Message
                    >
                </div>

                <div class="flex flex-col gap-1" v-if="initialValues.shippingMethod === 'Delivery'">
                    <label for="address" class="mb-1 hidden">Address</label>
                    <GooglePlacesAutocomplete
                        v-model="initialValues.address"
                        label="Address"
                        placeholder="Enter your address..."
                        :required="true"
                        @selected="
                            (item: any) => {
                                initialValues.address = item.description;
                                console.log('Selected address:', item);
                            }
                        "
                    />
                    <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{
                        $form.address.error.message
                    }}</Message>

                    <div v-if="initialValues.address.length > 0" class="mt-3 pt-3 bg-[#F2F5F2] rounded-t-md">
                        <p v-if="!isGettingRates && shippingOptions.length > 0" class="py-2 text-center">
                            Select your preferred courier
                        </p>
                        <div class="my-2">
                            <div class="max-h-70 overflow-y-auto overflow-x-hidden scrollbar-hide px-2 relative">
                                <div
                                    role="status"
                                    v-if="isGettingRates"
                                    class="w-full flex justify-center items-center p-10"
                                >
                                    <Spinner styleClass="fill-spanish-viridian w-16 h-16" />
                                </div>
                                <NoCouriersAvailable v-if="!isGettingRates && shippingOptions.length === 0" />
                                <label
                                    v-else
                                    class="bg-white flex justify-between py-3 border cursor-pointer px-2 rounded-2xl mb-2 items-center"
                                    :class="[
                                        initialValues.courier_id === option.courier_id
                                            ? 'border-spanish-viridian bg-spanish-viridian/5'
                                            : 'border-platinum',
                                    ]"
                                    v-for="option in shippingOptions"
                                    :key="String(option.courier_id)"
                                    :for="String(option.courier_id)"
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

                                    <RadioButton
                                        v-model="initialValues.courier_id"
                                        :inputId="String(option.courier_id)"
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
                            <Message
                                v-if="$form.courier_id?.invalid"
                                severity="error"
                                class="mt-1"
                                size="small"
                                variant="simple"
                                >{{ $form.courier_id.error.message }}</Message
                            >
                        </div>
                    </div>
                </div>

                <div v-if="initialValues.shippingMethod === 'Pickup'">
                    <p><span class="font-bold">Pickup at:</span> {{ storeInfo.pickup_location }}</p>
                </div>
            </div>

            <Button type="submit" severity="secondary" label="Next" class="py-3 bg-black text-white" />
        </Form>
    </div>
</template>
<script setup lang="ts">
import { watch, computed } from "vue";
import { useOrderStore } from "../stores/order";
import { useStoreInfo } from "../stores/storeInfo";
import { useRouter } from "vue-router";
import { useUtils } from "../composables/useUtils";
import { Icon } from "@iconify/vue";
import GooglePlacesAutocomplete from "../components/common/google-places-auto-complete.vue";
import { useApiCalls } from "../composables/useApiCalls";
import { useCartStore } from "../stores/cart";
import type { ShippingOption, StoreInfo } from "../includes/interfaces";
import NoCouriersAvailable from "../components/common/NoCouriersAvailable.vue";

const router = useRouter();
const { shippingDetails: initialValues } = useOrderStore();
const storeInfo = useStoreInfo().storeInfo as StoreInfo;

const { formatNaira } = useUtils();
const { cart } = useCartStore();
const { getRates } = useApiCalls();
const shippingOptions = computed(() => useStoreInfo().shippingOptions as ShippingOption[]);
const { mutate: getRatesMutation, isPending: isGettingRates } = getRates();

watch(
    () => initialValues.address,
    (newAddress) => {
        if (newAddress && newAddress.length > 10) {
            // Create sku_data as key-value pairs: { sku_id: quantity }
            const skuData: Record<string, number> = {};
            cart.forEach((item) => {
                skuData[item.selected_sku] = item.selected_quantity;
            });

            getRatesMutation({
                delivery_address: initialValues.address,
                customer_name: `${initialValues.firstName} ${initialValues.lastName}`,
                customer_phone: initialValues.phoneNumber,
                customer_email: initialValues.email,
                sku_data: skuData,
            });
        } else {
            initialValues.address = "";
        }
    },
    { immediate: true },
);

const resolver = ({ values }: { values: { [key: string]: any } }) => {
    const errors: Record<string, any[]> = {};

    if (!values.firstName) {
        errors.firstName = [{ message: "First name is required." }];
    }

    if (!values.lastName) {
        errors.lastName = [{ message: "Last name is required." }];
    }

    if (!values.email) {
        errors.email = [{ message: "Email is required." }];
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = [{ message: "Phone number is required." }];
    }

    if (!values.shippingMethod) {
        errors.shippingMethod = [{ message: "Shipping method is required." }];
    }

    if (values.shippingMethod === "Delivery" && !values.courier_id) {
        errors.courier_id = [{ message: "Courier is required." }];
    }

    if (values.shippingMethod === "Delivery" && !values.address) {
        errors.address = [{ message: "Address is required." }];
    }

    // if (!values.courier_id) {
    //     errors.courier
    // }

    return {
        errors,
        values,
    };
};

watch(
    () => initialValues.shippingMethod,
    (newMethod) => {
        if (newMethod === "Pickup") {
            initialValues.courier_id = "";
        }
    }
);

const onFormSubmit = ({ valid, values }: { valid: boolean; values: Record<string, any> }) => {
    if (valid) {
        if (values.shippingMethod === "Pickup") {
            (values.location = ""), (values.address = ""), (values.courier_id = "");
        }
        router.push({ name: "OrderSummary" });
    }
};
</script>
<style></style>
