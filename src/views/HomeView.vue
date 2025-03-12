<template>
    <div>
        <section class="p-4">
            <h1 class="text-5xl font-bold py-5">{{ storeInfo.title }}</h1>
            <p class="text-xl text-granite-gray py-3">{{ storeInfo.sub_title }}</p>
            <div class="flex gap-3 pt-3 pb-6">
                <button class="py-4 w-full bg-black text-white rounded-lg">Start Shopping Now</button>

                <button class="py-4 w-full bg-anti-flash-white rounded-lg">View Testimonial</button>
            </div>
        </section>
    </div>
</template>
<script setup>
import { useStoreInfo } from "../composables/useStoreInfo";

const { storeInfo } = useStoreInfo();
</script>
