<template>
    <div class="relative min-h-[20px]">
        <div class="w-full absolute h-0.5 rounded-full bg-black"></div>
        <input type="range" class="slider-part first-slider-part" :min="minValue" :max="maxValue" 
            :value="firstValue" @input="queryValueUpdate">
        <input type="range" class="slider-part second-slider-part" :min="minValue" :max="maxValue" 
            :value="secondValue" @input="queryValueUpdate">
    </div>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    defineProps({
        firstValue: {
            type: Number as PropType<number>,
            required: true
        },

        secondValue: {
            type: Number as PropType<number>,
            required: true
        },

        minValue: {
            type: Number as PropType<number>,
            required: true
        },

        maxValue: {
            type: Number as PropType<number>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : string, value : number) : void
    }>()

    function queryValueUpdate(event : Event) {
        const targetElement = event.target as HTMLInputElement
        let valueName = ''
        
        if(targetElement.classList.contains('first-slider-part')) {
            valueName = 'firstValue'
        }
        else if(targetElement.classList.contains('second-slider-part')) {
            valueName = 'secondValue'
        }

        console.log()
        emit('update:' + valueName, Number(targetElement.value))
    }
</script>

<style scoped>
    .slider-part {
        @apply appearance-none w-full absolute outline-0 pointer-events-none bg-transparent 
    }

    .slider-part::-webkit-slider-runnable-track, .slider-part::-moz-range-track, .slider-part::-ms-track {
        @apply pointer-events-none h-0.5
    }

    .slider-part::-webkit-slider-thumb {
        @apply appearance-none h-4 w-4 bg-black hover:cursor-pointer pointer-events-auto rounded-full -mt-2
            transition-shadow duration-300;
    }

    .slider-part::-moz-range-thumb {
        @apply appearance-none h-4 w-4 hover:cursor-pointer pointer-events-auto rounded-full bg-black transition-shadow 
            duration-300
    }

    .slider-part::-ms-thumb {
        @apply appearance-none h-4 w-4 hover:cursor-pointer pointer-events-auto rounded-full bg-black transition-shadow 
            duration-300;
    }

    .slider-part::-webkit-slider-thumb:active {
        box-shadow: 0 0 0 8px #00000050;
    }

    .slider-part::-moz-range-thumb:active {
        box-shadow: 0 0 0 8px #00000050;
    }

    .slider-part::-ms-thumb:active {
        box-shadow: 0 0 0 8px #00000050;
    }
</style>