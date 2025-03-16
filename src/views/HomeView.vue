<template>
    <div>
        <section class="p-4">
            <h1 class="py-5">{{ storeInfo.title }}</h1>
            <p class="text-granite-gray py-3 w-10/12">{{ storeInfo.sub_title }}</p>
            <div class="flex gap-3 pt-3 pb-6">
                <RouterLink to="/store" class="w-full">
                    <button class="py-5 w-full bg-black text-white rounded-lg">Start Shopping Now</button>
                </RouterLink>

                <router-link to="#testimonials" class="w-full">
                    <button class="py-5 w-full bg-anti-flash-white rounded-lg">View Testimonial</button>
                </router-link>
            </div>

            <SwiperCarousel>
                <SwiperSlide
                    v-for="(item, index) in storeInfo.landing_images"
                    :key="index"
                    class="flex justify-center items-center"
                >
                    <img :src="item" alt="Slide Image" class="rounded-lg shadow-lg object-cover h-80 w-full bg-manatee" />
                </SwiperSlide>
            </SwiperCarousel>
        </section>
        <!--  -->
        <section class="px-4 py-12 bg-black text-white" id="why-us">
            <h3 class="mb-3">{{ storeInfo.fold.title }}</h3>
            <p class="text-crayola py-3 w-11/12">{{ storeInfo.fold.content }}</p>

            <div class="flex flex-col gap-4">
                <div class="bg-chinese-black rounded-lg flex flex-col gap-3 p-5">
                    <img src="../assets/box.svg" alt="image of a black box" class="w-10 h-10" />
                    <h6>{{ storeInfo.fold.reason_1.title }}</h6>
                    <p class="text-crayola">{{ storeInfo.fold.reason_1.content }}</p>
                </div>

                <div class="bg-chinese-black rounded-lg flex flex-col gap-3 p-5">
                    <img src="../assets/box.svg" alt="image of a black box" class="w-10 h-10" />
                    <h6>{{ storeInfo.fold.reason_2.title }}</h6>
                    <p class="text-crayola">{{ storeInfo.fold.reason_2.content }}</p>
                </div>

                <div class="bg-chinese-black rounded-lg flex flex-col gap-3 p-5">
                    <img src="../assets/box.svg" alt="image of a black box" class="w-10 h-10" />
                    <h6>{{ storeInfo.fold.reason_3.title }}</h6>
                    <p class="text-crayola">{{ storeInfo.fold.reason_3.content }}</p>
                </div>
            </div>
        </section>
        <!--  -->
        <section class="py-12 px-4" id="best-sellers">
            <h3 class="mb-3">Best-Selling Products You’ll Love</h3>
            <p class="text-granite-gray py-3">Shop our most popular items, loved by customers like you</p>

            <div class="flex flex-wrap gap-1">
                <ProductCard v-for="product in storeInfo.best_sellers" :key="product.id" :product="product" />
            </div>

            <RouterLink to="/store" class="w-full flex justify-center pt-4">
                <button class="py-5 w-2/3 bg-black text-white rounded-lg">Start Shopping Now</button>
            </RouterLink>
        </section>
        <!--  -->
        <section class="py-12 px-4 text-white bg-black" id="testimonials">
            <h3 class="pb-5">What Our Customers Are Saying</h3>

            <div class="mt-5">
                <SwiperCarousel :theme="'dark'" :slidesPerView="1.07">
                    <SwiperSlide
                        v-for="(review, index) in storeInfo.reviews"
                        :key="index"
                        class="flex justify-center items-center"
                    >
                        <div class="bg-chinese-black rounded-lg flex flex-col gap-3 p-5">
                            <img src="../assets/campaign.svg" alt="campaign icon" class="w-10 h-10" />
                            <p class="text-crayola">{{ review.comment }}</p>
                            <div class="flex justify-end w-full">
                                <p class="text-manatee flex items-center"><Minus /> @{{ review.customer }}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </SwiperCarousel>
            </div>
        </section>
        <!--  -->
        <section class="py-12 px-4">
            <FooterComponent />
        </section>
    </div>
</template>

<script setup>
import { useStoreInfo } from "../composables/useStoreInfo";
import { SwiperSlide } from "swiper/vue";
import { Minus } from "lucide-vue-next";
import SwiperCarousel from "../components/SwiperCarousel.vue";
import ProductCard from "../components/ProductCard.vue";
import FooterComponent from "../components/layouts/FooterComponent.vue";

const { storeInfo } = useStoreInfo();
</script>
