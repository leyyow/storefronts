<template>
    <div class="px-4 pb-2 pt-4 flex flex-col min-h-full">
        <h5 class="font-normal py-2">Shipping Details</h5>
        <p class="text-granite-gray">Kindly input your information</p>

        <Form
            v-slot="$form"
            :initialValues
            :resolver
            :validateOnValueUpdate="false"
            :validateOnBlur="true"
            @submit="onFormSubmit"
            class="flex flex-col flex-1 gap-5 justify-between w-full mt-5"
        >
            <div class="flex flex-col gap-5 w-full">
                <div class="flex gap-2">
                    <div class="flex flex-col gap-1">
                        <label for="firstName" class="mb-1">First Name</label>
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
                        <label for="lastName" class="mb-1">Last Name</label>
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
                    <label for="email" class="mb-1">Email</label>
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
                    <label for="phoneNumber" class="mb-1">Phone Number</label>
                    <InputNumber
                        v-model="initialValues.phoneNumber"
                        name="phoneNumber"
                        prefix="+"
                        :useGrouping="false"
                        placeholder="+2348076963928"
                        fluid
                    />
                    <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple">{{
                        $form.phoneNumber.error.message
                    }}</Message>
                </div>

                <div>
                    <div class="flex gap-3">
                        <label for="Delivery" class="w-full cursor-pointer p-3 rounded-md bg-anti-flash-white block">
                            <div class="flex justify-between items-center">
                                <span>Delivery</span>
                                <RadioButton
                                    v-model="initialValues.shippingMethod"
                                    inputId="Delivery"
                                    name="shippingMethod"
                                    value="Delivery"
                                />
                            </div>
                            <p class="text-granite-gray leading-none text-xs mt-2">
                                Delivered to your door, hassle-free.
                            </p>
                        </label>

                        <label for="Pickup" class="w-full cursor-pointer p-3 rounded-md bg-anti-flash-white block">
                            <div class="flex justify-between items-center">
                                <span>Pickup</span>
                                <RadioButton
                                    v-model="initialValues.shippingMethod"
                                    inputId="Pickup"
                                    name="shippingMethod"
                                    value="Pickup"
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

                <div
                    class="bg-anti-flash-white rounded-md px-3 w-full"
                    v-if="initialValues.shippingMethod === 'Delivery'"
                >
                    <label
                        class="flex justify-between py-3 border-platinum border-b last-of-type:border-b-0 cursor-pointer"
                        v-for="location in storeInfo.shipping_prices"
                        :key="location.area"
                        :for="location.area"
                    >
                        <span>
                            {{ location.area }} -
                            <span class="font-bold" v-html="formatNaira(location.amount)"></span>
                        </span>
                        <RadioButton
                            v-model="initialValues.location"
                            :inputId="location.area"
                            name="location"
                            :value="location.area"
                        />
                    </label>

                    <Message
                        v-if="$form.location?.invalid"
                        severity="error"
                        class="mt-1"
                        size="small"
                        variant="simple"
                        >{{ $form.location.error.message }}</Message
                    >
                </div>

                <div class="flex flex-col gap-1" v-if="initialValues.shippingMethod === 'Delivery'">
                    <label for="address" class="mb-1">Address</label>
                    <InputText
                        v-model="initialValues.address"
                        name="address"
                        type="text"
                        placeholder="12, Ogun Street, Opebi"
                        fluid
                        class="px-4 py-3"
                        :formControl="{ validateOnValueUpdate: true }"
                    />
                    <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{
                        $form.address.error.message
                    }}</Message>
                </div>

                <div v-if="initialValues.shippingMethod === 'Pickup'">
                    <p><span class="font-bold">Pickup at:</span> {{ storeInfo.address }}</p>
                </div>
            </div>

            <Button type="submit" severity="secondary" label="Proceed to Checkout" class="py-3 bg-black text-white" />
        </Form>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useOrderStore } from "../stores/order";
import { useStoreInfo } from "../stores/storeInfo";
import { useRouter } from "vue-router";
import { useUtils } from "../composables/useUtils";

const router = useRouter();
const { shippingDetails: initialValues } = useOrderStore();
const { storeInfo } = useStoreInfo();
const { formatNaira } = useUtils();

const resolver = ({ values }) => {
    const errors = {};

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

    if (values.shippingMethod === "Delivery" && !values.location) {
        errors.location = [{ message: "Location is required." }];
    }

    if (values.shippingMethod === "Delivery" && !values.address) {
        errors.address = [{ message: "Address is required." }];
    }

    return {
        errors,
        values,
    };
};

const onFormSubmit = ({ valid, values }) => {
    if (valid) {
        if (values.shippingMethod === "Pickup") {
            (values.location = ""), (values.address = "");
        }
        router.push({ name: "OrderSummary" });
    }
};
</script>
<style></style>
