<template>
    <footer class="flex justify-between">
        <div class="w-1/4 flex flex-col gap-4">
            <h6 class="text-sm">Company</h6>
            <RouterLink to="#" class="text-granite-gray text-xs">Shop All</RouterLink>
            <RouterLink to="#" class="text-granite-gray text-xs">Terms & Conditions</RouterLink>
            <RouterLink to="#" class="text-granite-gray text-xs">Return Policy</RouterLink>
        </div>
        <div class="w-[44%] flex flex-col gap-4">
            <h6 class="text-sm">Support</h6>
            <a :href="`mailto:${storeInfo.email}`" class="text-granite-gray text-xs">{{ storeInfo.email }}</a>
            <a :href="`tel:${storeInfo.phone_number}`" class="text-granite-gray text-xs">{{
                storeInfo.phone_number
            }}</a>
        </div>
        <div class="w-1/4 flex flex-col gap-4">
            <h6 class="text-sm">Socials</h6>
            <RouterLink to="#" class="text-granite-gray text-xs">Instagram</RouterLink>
            <RouterLink to="#" class="text-granite-gray text-xs">Twitter</RouterLink>
            <RouterLink to="#" class="text-granite-gray text-xs">Facebook</RouterLink>
            <RouterLink to="#" class="text-granite-gray text-xs">TikTok</RouterLink>
        </div>
    </footer>
</template>

<script setup>
import { useStoreInfo } from "../../stores/storeInfo";

const { storeInfo } = useStoreInfo();
</script>
