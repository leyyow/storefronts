<template>
    <div>
        <div class="rounded-sm bg-anti-flash-white p-3 flex items-center justify-between">
            <p>Price</p>
            <div class="rounded-full text-spanish-viridian bg-spanish-viridian/50 flex items-center justify-center p-1">
                <Check class="w-3 h-3" />
            </div>
        </div>

        <p class="mt-4">Sorting Direction</p>
        <select
            v-model="selectedSortOrder"
            class="w-full rounded-sm bg-anti-flash-white p-3"
        >
            <option value="asc">Lowest - Highest Price</option>
            <option value="desc">Highest - Lowest Price</option>
        </select>

        <div class="mt-3 flex gap-3">
            <Button class="w-1/3 bg-anti-flash-white text-black cursor-pointer border-0 py-3" @click="reset">Reset</Button>
            <Button class="w-2/3 bg-black text-white cursor-pointer border-0 py-3" @click="updateSort">Apply</Button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, watchEffect } from "vue";
import { useProductStore } from "../stores/product";
import { Check } from "lucide-vue-next";

const emit = defineEmits(["closePopup"]);

const { selectSortOrder, resetSort, sortOrder } = useProductStore();
const selectedSortOrder = ref(sortOrder.value); // Initialize with current sort

// Keep selectedSortOrder in sync with store value
watchEffect(() => {
    selectedSortOrder.value = sortOrder.value;
});

// Function to apply sorting
const updateSort = () => {
    console.log(selectedSortOrder);
    
    selectSortOrder(selectedSortOrder.value);
    emit("closePopup");
};

// Function to reset sorting
const reset = () => {
    resetSort();
    selectedSortOrder.value = "def";
    emit("closePopup");
};
</script>
