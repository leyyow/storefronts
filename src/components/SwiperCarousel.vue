<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";

const paginationRef = ref(null);

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
    theme: {
        type: String,
        default: "light",
        validator: (value) => ["light", "dark"].includes(value),
    },
});
</script>

<template>
    <div class="w-full">
        <!-- Swiper Carousel -->
        <Swiper
            :slides-per-view="slidesPerView"
            :space-between="spaceBetween"
            :pagination="{ el: paginationRef, clickable: true }"
            :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
            :modules="[Pagination, Navigation]"
            :loop="loop"
            class="relative"
        >
            <slot></slot>
        </Swiper>

        <div class="relative flex justify-between items-center mt-4 py-5 z-0">
            <!-- Pagination (Left Side) -->
            <div
                ref="paginationRef"
                :class="[
                    'swiper-pagination flex items-center gap-1.5 relative py-1.5 px-2 rounded-xl w-auto',
                    theme === 'dark' ? 'bg-chinese-black' : 'bg-bright-gray',
                ]"
            ></div>

            <!-- Navigation Buttons (Right Side) -->
            <div class="flex items-center gap-6">
                <div
                    :class="[
                        'swiper-button-prev relative after:content-none p-2 rounded-lg flex items-center justify-center w-8 h-8',
                        theme === 'dark' ? 'bg-white/40 text-white' : 'bg-black/40 text-black',
                    ]"
                >
                    <ArrowLeft class="w-6 h-6" />
                </div>
                <div
                    :class="[
                        'swiper-button-next relative after:content-none p-2 rounded-lg flex items-center justify-center w-8 h-8',
                        theme === 'dark' ? 'bg-white/40 text-white' : 'bg-black/40 text-black',
                    ]"
                >
                    <ArrowRight class="w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.swiper-pagination-bullet {
    background-color: #c4c4c4 !important;
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

.swiper-pagination-bullet-active {
    background-color: #c4c4c4 !important;
    width: 25px;
    border-radius: 10px;
}

.swiper-pagination-bullet-active::after {
    content: "";
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s ease;
}

.bg-chinese-black .swiper-pagination-bullet-active {
    background-color: #323131 !important;
    width: 25px;
    border-radius: 10px;
}

.bg-chinese-black .swiper-pagination-bullet-active::after {
    background: #FFF;
}
</style>
