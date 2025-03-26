<template>
    <div class="p-4 h-screen overflow-hidden">
        <Skeleton width="5rem" height="2rem" class="mb-10"></Skeleton>
        <Skeleton height="2rem" class="w-screen mb-5"></Skeleton>
        <Skeleton width="5rem" height="2.5rem" class="mb-2"></Skeleton>
        <div class="flex gap-3 py-6">
            <Skeleton height="2rem" class="w-9/12"></Skeleton>
            <Skeleton height="2rem" width="2rem"></Skeleton>
            <Skeleton height="2rem" width="2rem"></Skeleton>
        </div>

        <section>
            <div class="flex flex-wrap gap-1">
                <Skeleton class="w-[32.5%] h-32 mb-0.5 rounded-sm" v-for="_ in 12"></Skeleton>
            </div>
        </section>
    </div>
</template>
<script setup></script>
