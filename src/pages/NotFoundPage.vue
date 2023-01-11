<template>
    <main class="pt-24 bg-white">
        <h2 class="text-3xl text-center mb-5">
            Requested page doesn’t  exist
        </h2>

        <p class="text-lg text-center text-neutral-500 mb-6 w-1/2 mx-auto m:w-full px-6 3xl:text-2xl">
            Check that you haven’t done any typos in address. It is also possible that we’re having some 
            technical problems now
        </p>

        <router-link to="/">
            <simple-button class="mx-auto block">
                Go to main page
            </simple-button>
        </router-link>

        <img src="@/assets/images/not-found-illustration.svg" alt="Laptop under magnifier" class="w-1/3 mx-auto min-w-3">
    </main>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
</script>

<style>

</style>