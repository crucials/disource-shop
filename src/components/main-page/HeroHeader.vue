<template>
    <header class="hero-header" :class="{ 'hero-header-loaded': pageLoaded }">
        <div class="relative min-w-2.5">
            <h1 class="text-white font-normal text-4xl mb-3.5 transition-all duration-1000 ease-in-out"
                :class="pageLoaded ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'">
                Buy high-quality devices for low price
            </h1>
    
            <p class="text-white font-normal text-xl mb-7 transition-all delay-500 duration-1000 ease-in-out"
                :class="pageLoaded ? 'translate-x-0 opacity-1' : 'translate-x-8 opacity-0'">
                We are here to make your shopping easier and more comfortable.
            </p>
    
            <router-link to="/catalog">
                <simple-button variant="filled-alternative">
                    View full catalog
                </simple-button>
            </router-link>
        </div>
    
        <img src="@/assets/images/hero-header-bg.png" alt="Laptop and headphones on a white background"
            class="hidden m:block w-2/5 min-w-2.5 sm:w-full">
    </header>
</template>

<script lang="ts" setup>
    import { usePageLoadListener } from '@/composables/page-load-listener'

    const { pageLoaded } = usePageLoadListener()
</script>

<style scoped>
    .hero-header {
        @apply p-14 bg-soft-black m:flex m:justify-between m:items-center m:gap-x-6 sm:flex-col gap-y-12;
        transition: background-size 1.3s cubic-bezier(0.19, 1, 0.22, 1);
        background-image: url('@/assets/images/hero-header-bg.png');
        background-repeat: no-repeat;
        background-size: 0px;
        background-position: right 80px bottom 190%;
    }

    .hero-header-loaded {
        background-size: max(30%, 500px);
    }

    .hero-header-loaded:hover {
        background-size: max(33%, 520px);
    }

    @media (min-width: 1730px) {
        .hero-header-loaded {
            background-position: right 10% bottom 130%;
        }
    }
    
    @media (max-width: 1230px) {
        .hero-header-loaded {
            background-size: 350px;
            background-position: right 10px bottom -205%;
        }

        .hero-header-loaded:hover {
            background-size: 385px;
        }
    }

    @media (max-width: 1050px) {
        .hero-header {
            background-image: none;
        }
    }
</style>