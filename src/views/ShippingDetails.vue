<template>
    <div class="px-4 pb-2 pt-4">
        <h5 class="font-normal py-2">Shipping Details</h5>
        <p class="text-granite-gray">Kindly input your information</p>

        <Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" class="flex flex-col gap-5 w-full mt-5">
            <div class="flex flex-col gap-1">
                <label for="name" class="mb-1">Name</label>
                <InputText v-model="initialValues.name" name="name" type="text" placeholder="eg: Temi John" fluid class="px-4 py-3" />
                <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
            </div>
            <div class="flex flex-col gap-1">
                <label for="email" class="mb-1">Email</label>
                <InputText v-model="initialValues.email" name="email" type="text" placeholder="example@gmail.com" fluid class="px-4 py-3" :formControl="{ validateOnValueUpdate: true }" />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
            </div>
            <div class="flex flex-col gap-1">
                <label for="phoneNumber" class="mb-1">Phone Number</label>
                <InputNumber v-model="initialValues.phoneNumber" name="phoneNumber" prefix="+" :useGrouping="false" placeholder="+2348076963928" fluid />
                <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple">{{ $form.phoneNumber.error.message }}</Message>
            </div>

            <div>
                <div class="flex gap-3">
                    <div class="w-full p-3 rounded-md bg-anti-flash-white">
                        <div class="flex justify-between">
                            <label for="Delivery">Delivery</label>
                            <RadioButton v-model="initialValues.shippingMethod" inputId="Delivery" name="shippingMethod" value="Delivery" />
                        </div>
                        <p class="text-granite-gray leading-none text-xs mt-2">Delivered to your door, hassle-free.</p>
                    </div>
                    <div class="w-full p-3 rounded-md bg-anti-flash-white">
                        <div class="flex justify-between">
                            <label for="Pickup">Pickup</label>
                            <RadioButton v-model="initialValues.shippingMethod" inputId="Pickup" name="shippingMethod" value="Pickup" />
                        </div>
                        <p class="text-granite-gray leading-none text-xs mt-2">Pick up your order at your convenience</p>
                    </div>
                </div>
                <Message v-if="$form.shippingMethod?.invalid" severity="error" class="mt-1" size="small" variant="simple">{{ $form.shippingMethod.error.message }}</Message>
            </div>

            <div class="bg-anti-flash-white rounded-md px-3 w-full" v-if="initialValues.shippingMethod === 'Delivery'">
                <div class="flex justify-between py-3 border-platinum border-b last-of-type:border-b-0" v-for="location in storeInfo.shipping_prices">
                    <label :for="location.area">{{ location.area }} - <span class="font-bold"><small class="me-0.5">₦</small>{{ location.amount.toLocaleString() }}<small>.00</small></span></label>
                    <RadioButton v-model="initialValues.location" :inputId="location.area" name="location" :value="location.area" />
                </div>
                <Message v-if="$form.location?.invalid" severity="error" class="mt-1" size="small" variant="simple">{{ $form.location.error.message }}</Message>
            </div>

            <div class="flex flex-col gap-1" v-if="initialValues.shippingMethod === 'Delivery'">
                <label for="address" class="mb-1">Address</label>
                <InputText v-model="initialValues.address" name="address" type="text" placeholder="12, Ogun Street, Opebi" fluid class="px-4 py-3" :formControl="{ validateOnValueUpdate: true }" />
                <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error.message }}</Message>
            </div>

            <div v-if="initialValues.shippingMethod === 'Pickup'">
                <p><span class="font-bold">Pickup at:</span> {{ storeInfo.address }}</p>
            </div>

            <Button type="submit" severity="secondary" label="Proceed to Checkout" class="py-3 bg-black text-white" />
        </Form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useOrderStore } from '../stores/order';
import { useStoreInfo } from '../stores/storeInfo';
import { useRouter } from 'vue-router';

const router = useRouter();
const { shippingDetails: initialValues } = useOrderStore();
const { storeInfo } = useStoreInfo();

const resolver = ({ values }) => {
    const errors = {};

    if (!values.name) {
        errors.name = [{ message: 'Name is required.' }];
    }

    if (!values.name) {
        errors.email = [{ message: 'Email is required.' }];
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = [{ message: 'Phone number is required.' }];
    }

    if (!values.shippingMethod) {
        errors.shippingMethod = [{ message: 'Shipping method is required.' }];
    }

    if (values.shippingMethod === 'Delivery' && !values.location) {
        errors.location = [{ message: 'Location is required.' }];
    }

    if (values.shippingMethod === 'Delivery' && !values.address) {
        errors.address = [{ message: 'Address is required.' }];
    }

    return {
        errors,
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        router.push({ name: 'OrderSummary' });
    }
}
</script>
<style>
    
</style>