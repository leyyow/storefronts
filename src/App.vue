<template>
    <div class="font-aeonik h-screen flex justify-center items-center">
        <div class="md:w-md w-full h-full max-h-screen overflow-y-auto scrollbar-hide">
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style>
/* .fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s linear;
}

.fade-leave-to {
    transition: all 0.5s linear;
    opacity: 0;
} */
</style>
