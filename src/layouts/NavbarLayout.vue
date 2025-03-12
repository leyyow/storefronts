<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/layouts/Navbar.vue';
</script>