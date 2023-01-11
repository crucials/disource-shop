<template>
    <div class="relative w-2/5 flex items-center justify-between gap-x-2">
        <button class="transition-transform duration-300 hover:scale-105 p-3" @click="goToPreviousPhoto">
            <img src="@/assets/images/left-arrow.svg" alt="Left arrow">
        </button>
        
        <img v-for="photo in photos" :src="photo.src" :alt="photo.altText" class="w-[58%] transition-all
            duration-500 object-center" 
            :class="currentPhotoIndex == photos.indexOf(photo) ? 'static opacity-100' : 
            'absolute opacity-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'">

        <button class="transition-transform duration-300 hover:scale-105 p-3" @click="goToNextPhoto">
            <img src="@/assets/images/right-arrow.svg" alt="Right arrow">
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, type PropType } from 'vue'


    type Photo = {
        src : string,
        altText : string
    }

    const props = defineProps({
        photos: {
            type: Array as PropType<Photo[]>,
            required: true
        }
    })

    const currentPhotoIndex = ref(0)

    function goToNextPhoto() {
        if(currentPhotoIndex.value < props.photos.length - 1) {
            currentPhotoIndex.value++
        }
    }

    function goToPreviousPhoto() {
        if(currentPhotoIndex.value > 0) {
            currentPhotoIndex.value--
        }
    }
</script>

<style>

</style>