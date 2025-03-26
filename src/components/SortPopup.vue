<template>
    <div>
        <div class="rounded-sm bg-anti-flash-white p-3 flex items-center justify-between">
            <p>Price</p>
            <div class="rounded-full text-spanish-viridian bg-spanish-viridian/50 flex items-center justify-center p-1">
                <Check class="w-3 h-3" />
            </div>
        </div>

        <p class="mt-4">Sorting Direction</p>
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
            <Select name="order" v-model="selectedSortOrder" :options="options" optionLabel="name" class="w-full rounded-sm bg-anti-flash-white py-2 border-0" fluid>
            </Select>

            <Message v-if="$form.order?.invalid" severity="error" size="small" variant="simple">{{
                $form.order.error?.message
            }}</Message>

            <div class="mt-3 flex gap-3">
                <Button class="w-1/3 bg-anti-flash-white text-black cursor-pointer border-0 py-3" @click="reset"
                    >Reset</Button
                >
                <Button
                    class="w-2/3 bg-black text-white cursor-pointer border-0 py-3"
                    type="submit"
                    severity="secondary"
                    label="Apply"
                />
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref, defineEmits, reactive } from "vue";
import { useProductStore } from "../stores/product";
import { Check } from "lucide-vue-next";

const emit = defineEmits(["closePopup"]);

const { selectSortOrder, resetSort, sortOrder } = useProductStore();
const selectedSortOrder = ref(sortOrder);
const options = ref([
    { name: 'Lowest - Highest Price', code: 'asc' },
    { name: 'Highest - Lowest Price', code: 'desc' },
]);

const initialValues = reactive({
    order: selectedSortOrder,
});

const resolver = ({ values }) => {
    const errors = {};

    if (values.order === "def") {
        errors.order = [{ message: "Please enter a valid order" }];
    }

    return {
        values,
        errors,
    };
};

const onFormSubmit = ({ valid, values }) => {
    if (valid) {
        updateSort(values.order.code);
    }
};

// Function to apply sorting
const updateSort = (val) => {
    selectSortOrder(val);
    emit("closePopup");
};

// Function to reset sorting
const reset = () => {
    resetSort();
    selectedSortOrder.value = "def";
    emit("closePopup");
};
</script>
