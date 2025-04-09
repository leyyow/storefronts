<template>
  <Toast position="top-center" group="headless" @close="handleClose">
    <template #container="{ message, closeCallback }">
      <section class="w-full flex justify-center bg-transparent">
        <div class="bg-white rounded-4xl py-2 px-2.5 w-5/8 border border-platinum">
          <div class="flex justify-between items-center">
            <div class="w-10 h-10 bg-anti-flash-white rounded-full flex justify-center items-center">
              <div class="rounded-full w-6 h-6 flex justify-center items-center text-spanish-viridian bg-spanish-viridian/30">
                <Check class="w-4 h-4" />
              </div>
            </div>
            <p class="pe-2">Item added to basket</p>
          </div>
        </div>
      </section>
    </template>
  </Toast>
</template>

<script setup>
import { Check } from "lucide-vue-next";

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>
