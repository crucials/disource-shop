<template>
    <button class="px-9 rounded-lg text-lg active:scale-105" 
        :class="variant">
        <span class="relative transition-colors z-10">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    defineProps({
        variant: {
            type: String as PropType<'filled' | 'outlined' | 'filled-alternative'>,
            default: 'filled'
        }
    })
</script>

<style scoped>
    .filled {
        @apply py-3 bg-soft-black text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/20;
    }

    .filled-alternative {
        @apply py-3 bg-white text-black transition-all duration-500 hover:shadow-lg hover:shadow-white/20;;
    }

    .outlined {
        @apply transition-all border-2 border-soft-black relative bg-white py-2.5 
            text-black after:absolute after:h-full after:w-full after:-left-full after:top-0 
            hover:after:left-0 after:bg-soft-black overflow-hidden hover:text-white after:transition-all 
            after:duration-300 after:z-0;
    }
</style>