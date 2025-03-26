<template>
    <div class="p-4 h-screen overflow-hidden">
        <Skeleton width="5rem" height="2rem" class="mb-10"></Skeleton>
        <Skeleton height="3rem" class="my-5 w-11/12"></Skeleton>
        <Skeleton height="3rem" class="my-5 w-6/12"></Skeleton>
        <Skeleton height="1rem" class="my-5 w-11/12"></Skeleton>
        <Skeleton height="1rem" class="my-1 w-6/12"></Skeleton>
        <div class="flex gap-3 py-6">
            <Skeleton height="3rem" class="w-6/12"></Skeleton>
            <Skeleton height="3rem" class="w-6/12"></Skeleton>
        </div>
        
        <div class="flex overflow-x-hidden space-x-4">
            <Skeleton height="15rem" width="9rem" class="rounded-lg shadow-lg flex-shrink-0"></Skeleton>
            <Skeleton height="15rem" width="9rem" class="rounded-lg shadow-lg flex-shrink-0"></Skeleton>
            <Skeleton height="15rem" width="9rem" class="rounded-lg shadow-lg flex-shrink-0"></Skeleton>
        </div>
    </div>
</template>
<script setup></script>
