<template>
    <div class="flex flex-col min-h-screen p-4 z-50 fixed top-0 left-0 right-0 bg-white">
        <div class="flex-1 flex flex-col items-center justify-center p-4">
            <div class="relative top-12 flex flex-col items-center justify-center">
                <img
                    :src="storeInfo.store_logo ? storeInfo.store_logo : fallbackLogo"
                    alt="logo"
                    :class="storeInfo.store_logo ? 'h-10 mb-6' : 'h-5'"
                />
                <img src="../../assets/images/gifs/shopping-bag.gif" alt="shopping bag gif" class="w-32 h-32 mb-6 -z-10" />
            </div>
            <h6 class="mb-4 text-center z-10">This store isn’t live just yet, but it’ll be worth the wait!</h6>
            <p class="text-granite-gray mb-6 text-center">Enter your email below to get notified when they are live.</p>

            <form class="w-full" @submit.prevent="handleNotify">
                <input type="email" placeholder="Enter your email" class="w-full px-2 py-3 rounded mb-2" required />
                <Button type="submit" severity="secondary" label="Notify Me" class="bg-black text-white py-3 w-full" />
            </form>
        </div>

        <div class="rounded-md bg-anti-flash-white text-granite-gray p-4 text-center">
            <p>
                Get your own website
                <a
                    href="http://www.leyyow.com/auth/signup"
                    class="text-spanish-viridian underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    >here</a
                >
            </p>
            <div class="text-xs flex items-center justify-center mt-2 gap-1">
                <p class="text-metallic-silver">Powered by</p>
                <img src="../../assets/images/pngs/leyyow-logo.png" alt="leyyow logo" class="inline h-4" />
            </div>
        </div>

        <Dialog v-model:visible="showModal" modal class="w-11/12 max-w-md">
            <div>
                <div class="w-full flex justify-center mb-4">
                    <img
                        src="../../assets/images/gifs/check-mark.gif"
                        alt="check mark gif"
                        class="h-40"
                    />
                </div>
                <h6 class="mb-4 text-center z-10">🎉 You’re on the list!</h6>
                <p class="text-granite-gray mb-6 text-center">We’ll be sure to let you know when {{ getCurrentStoreSlug() }} is live.</p>
                <Button
                    type="submit"
                    severity="secondary"
                    label="Okay"
                    @click="showModal = false"
                    class="bg-black text-white py-3 w-full"
                />
            </div>
        </Dialog>
    </div>
</template>
<script setup>
import { useStoreInfo } from "../../stores/storeInfo";
import fallbackLogo from "../../assets/images/pngs/leyyow-logo.png";
import { ref } from "vue";
import { getCurrentStoreSlug } from "../../includes/utils";

const showModal = ref(false);
const handleNotify = () => {
    showModal.value = true;
    console.log("Notify me form submitted");
};
const { storeInfo } = useStoreInfo();
</script>
