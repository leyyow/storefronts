<template>
    <div class="relative" @wheel.prevent @touchmove.prevent @scroll.prevent>
        <nav class="py-5 px-4 flex justify-between items-center z-20">
            <RouterLink to="/" class="logo max-h-8">
                <h5 class="text-dark-green font-bold text-2xl">Logo</h5>
            </RouterLink>

            <!-- <div
                :class="[
                    'menu transition-all bg-dark-slate-gray/30 hover:bg-dark-slate-gray/20 text-dark-slate-gray rounded-lg cursor-pointer',
                    { 'rounded-xl': navIsOpen },
                ]"
                @click="toggleNav"
            >
                <Menu class="h-6 w-6 m-0.5" v-if="!navIsOpen" />
                <X class="h-6 w-6" v-else />
            </div> -->
        </nav>
        <div v-if="navIsOpen" class="nav__menu border-t-2 border-platinum flex-1 bg-white absolute h-screen w-full z-10">
            <div class="py-8 px-6 flex flex-col">
                <router-link @click="toggleNav" to="#why-us" class="mb-4 text-xl">Why Us?</router-link>
                <router-link @click="toggleNav" :to="{ name: 'Store' }" class="mb-4 text-xl">Shop Now</router-link>
                <router-link @click="toggleNav" to="#best-sellers" class="mb-4 text-xl"
                    >Best Selling Products</router-link
                >
                <router-link @click="toggleNav" to="#" class="mb-4 text-xl">Return Policy</router-link>
                <div class="flex gap-3 pt-2">
                    <RouterLink @click="toggleNav" to="/store" class="w-full">
                        <button class="py-4 w-full bg-black text-white rounded-lg">Enter Shop</button>
                    </RouterLink>

                    <router-link
                        @click="toggleNav"
                        to="#testimonials"
                        class="w-full"
                        v-if="storeInfo.reviews.length > 0"
                    >
                        <button class="py-4 w-full bg-anti-flash-white rounded-lg">Testimonials</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Menu, X } from "lucide-vue-next";
import { ref } from "vue";
import { useStoreInfo } from "../../composables/useStoreInfo";

const navIsOpen = ref(false);
const { storeInfo } = useStoreInfo();

const toggleNav = () => {
    navIsOpen.value = !navIsOpen.value;
};
</script>
