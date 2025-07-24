<template>
    <div class="flex flex-col min-h-screen p-4">
        <div class="flex-1 flex flex-col items-center justify-center p-4">
            <img
                :src="storeInfo.store_logo ? storeInfo.store_logo : fallbackLogo"
                alt="logo"
                :class="storeInfo.store_logo ? 'h-10 mb-6' : 'h-5'"
            />
            <img src="../assets/images/gifs/magnifying-glass.gif" alt="magnifying glass gif" class="w-32 h-32 mb-6" />
            <h5 class="font-bold mb-4">Almost Ready!</h5>
            <p class="text-granite-gray mb-6 text-center">
                This store isn’t live just yet, but it’ll be worth the wait. Come back soon to shop their products!
            </p>
        </div>

        <div class="rounded-md bg-anti-flash-white text-granite-gray p-4">
            <p>
                Create your own store for free.
                <a
                    href="http://www.leyyow.com/auth/signup"
                    class="text-spanish-viridian underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Start now</a
                >
            </p>
            <div class="text-xs flex items-center justify-center mt-2 gap-1">
                <p class="text-metallic-silver">Made with </p><img src="../assets/images/pngs/leyyow-logo.png" alt="leyyow logo" class="inline h-4" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStoreInfo } from "../stores/storeInfo";
import fallbackLogo from "../assets/images/pngs/leyyow-logo.png";

const { storeInfo } = useStoreInfo();
</script>
