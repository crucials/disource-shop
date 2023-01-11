<template>
    <div v-show="reviews.length > 0">
        <h5 class="font-semibold text-3xl mb-8">
            Reviews
        </h5>

        <review-item v-for="review in reviews" :key="review.id" :review="review" class="mb-9 last:mb-0"/>
    </div>
</template>

<script lang="ts" setup>
    import ReviewItem from './ReviewItem.vue'

    import type { Review } from '@/scripts/types'
    import type { PropType } from 'vue'

    defineProps({
        reviews: {
            type: Array as PropType<Review[]>,
            required: true
        }
    })
</script>

<style>

</style>