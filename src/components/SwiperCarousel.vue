<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";

defineProps({
    slidesPerView: {
        type: Number,
        default: 1.5,
    },
    spaceBetween: {
        type: Number,
        default: 20,
    },
    loop: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div class="w-full">
        <!-- Swiper Carousel -->
        <Swiper
            :slides-per-view="slidesPerView"
            :space-between="spaceBetween"
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
            :modules="[Pagination, Navigation]"
            :loop="loop"
            class="relative"
        >
            <slot></slot>
            <!-- This allows the parent to provide SwiperSlides -->
        </Swiper>

        <div class="relative flex justify-between items-center mt-4 py-5 z-0">
            <!-- Pagination (Left Side) -->
            <div
                class="swiper-pagination flex items-center gap-1.5 relative py-1.5 px-2 bg-bright-gray rounded-xl w-auto"
            ></div>

            <!-- Navigation Buttons (Right Side) -->
            <div class="flex items-center gap-6">
                <div
                    class="swiper-button-prev relative after:content-none bg-black/40 p-2 rounded-lg flex items-center justify-center w-8 h-8"
                >
                    <ArrowLeft class="w-6 h-6 text-black" />
                </div>
                <div
                    class="swiper-button-next relative after:content-none bg-black/40 p-2 rounded-lg flex items-center justify-center w-8 h-8"
                >
                    <ArrowRight class="w-6 h-6 text-black" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Default bullet styling */
.swiper-pagination-bullet {
    background-color: #C4C4C4 !important;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
}

/* Active bullet styling */
.swiper-pagination-bullet-active {
    background-color: #C4C4C4 !important;
    width: 25px;
    border-radius: 10px;
}

/* Black circle inside active bullet */
.swiper-pagination-bullet-active::after {
    content: '';
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s ease;
}
</style>
