<template>
    <div>
        <section class="p-4">
            <h1 class="text-5xl font-bold py-5">{{ storeInfo.title }}</h1>
            <p class="text-xl text-granite-gray py-3">{{ storeInfo.sub_title }}</p>
            <div class="flex gap-3 pt-3 pb-6">
                <button class="py-4 w-full bg-black text-white rounded-lg">Start Shopping Now</button>

                <button class="py-4 w-full bg-anti-flash-white rounded-lg">View Testimonial</button>
            </div>

            <SwiperCarousel>
                <SwiperSlide
                    v-for="(item, index) in storeInfo.landing_images"
                    :key="index"
                    class="flex justify-center items-center"
                >
                    <img :src="item" alt="Slide Image" class="rounded-lg shadow-lg object-cover h-80 w-full" />
                </SwiperSlide>
            </SwiperCarousel>
        </section>
    </div>
</template>
<script setup>
import { useStoreInfo } from "../composables/useStoreInfo";
import { SwiperSlide } from "swiper/vue";
import SwiperCarousel from "../components/SwiperCarousel.vue";

const { storeInfo } = useStoreInfo();
</script>
