<template>
    <navigation-bar/>
    <router-view></router-view>
</template>

<script lang="ts" setup>
    import NavigationBar from './components/NavigationBar.vue'
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @font-face {
        font-family: 'Source Sans Pro';
        src: url('./assets/fonts/Source-Sans-Pro-Light.woff');
        font-weight: 300;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        src: url('./assets/fonts/Source-Sans-Pro-Regular.woff');
        font-weight: normal;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        src: url('./assets/fonts/Source-Sans-Pro-SemiBold.woff');
        font-weight: 600;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        src: url('./assets/fonts/Source-Sans-Pro-Bold.woff');
        font-weight: bold;
    }

    html {
        scroll-behavior: smooth;
    }

    * {
        @apply font-source-sans-pro selection:bg-soft-black selection:text-white;
    }

    .checkbox {
        @apply appearance-none relative bg-white m-0 w-5 h-5 rounded-[4px] border-2 border-black 
            after:content-['✓'] after:w-full after:h-full after:absolute after:bg-black after:left-1/2 after:top-1/2 
            after:-translate-x-1/2 after:-translate-y-1/2 after:transition-transform after:duration-300 after:scale-0 
            after:text-white after:font-semibold after:text-sm after:flex after:items-center after:justify-center 
            checked:after:scale-100 transition-colors duration-500 hover:bg-neutral-100 hover:cursor-pointer;
    }
</style>