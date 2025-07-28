<template>
    <div>
        <NotFoundScreen v-if="showNotFound" />
        <div v-else>
            <header>
                <Navbar />
            </header>
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from "../components/layouts/Navbar.vue";
import NotFoundScreen from "../components/layouts/404Screen.vue";
import { useGlobalStore } from "../stores/global.ts";

const { showNotFound } = useGlobalStore();
</script>
