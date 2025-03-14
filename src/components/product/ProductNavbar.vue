<template>
    <div class="relative">
        <nav class="py-5 px-4 flex justify-between items-center z-20 border-b-2 border-platinum">
            <div @click.prevent="goBack" class="logo max-h-8 cursor-pointer flex items-center gap-3">
                <button class="p-0.5 text-dark-green bg-dark-green/50 rounded-sm">
                    <ArrowLeft />
                </button>
                <h5 class="font-normal text-2xl">Shop</h5>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ArrowLeft } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
    router.back(); // Goes to the previous page
};

</script>
