<template>
    <div class="relative" @wheel.prevent @touchmove.prevent @scroll.prevent>
        <nav class="py-5 px-4 flex justify-between items-center z-20">
            <div class="logo max-h-8">
                <h5 class="text-dark-green font-bold text-2xl">Logo</h5>
            </div>

            <div
                :class="[
                    'menu transition-all bg-dark-slate-gray/30 hover:bg-dark-slate-gray/20 text-dark-slate-gray rounded-lg cursor-pointer',
                    { 'rounded-xl': navIsOpen },
                ]"
                @click="toggleNav"
            >
                <Icon icon="material-symbols-light:menu-rounded" class="h-6 w-6 m-0.5" v-if="!navIsOpen" />
                <Icon icon="material-symbols-light:close-rounded" class="h-6 w-6" v-else />
            </div>
        </nav>
        <div v-if="navIsOpen" class="nav__menu border-t-2 border-columbia-blue flex-1 bg-white fixed h-screen w-screen z-10">
            <div class="py-8 px-6 flex flex-col">
                <router-link to="#" class="mb-4 text-xl">Why Us?</router-link>
                <router-link to="#" class="mb-4 text-xl">Shop Now</router-link>
                <router-link to="#" class="mb-4 text-xl">Best Selling Products</router-link>
                <router-link to="#" class="mb-4 text-xl">Return Policy</router-link>
                <div class="flex gap-3 pt-2">
                    <button class="py-4 w-full bg-black text-white rounded-lg">
                        Start Shopping Now
                    </button>

                    <button class="py-4 w-full bg-anti-flash-white rounded-lg">
                        View Testimonial
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const navIsOpen = ref(false);

const toggleNav = () => {
    navIsOpen.value = !navIsOpen.value;
};
</script>
