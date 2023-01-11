<template>
    <div class="flex justify-center gap-x-2.5 select-none" :title="rate > 0 ? rate + ' out of 5 stars' : undefined">
        <star-button :active="rate >= 1" :class="editable ? 'editable-star' : 'hover:cursor-default'" 
            @click.prevent="queryRateChange(1)"/>
        <star-button :active="rate >= 2" :class="editable ? 'editable-star' : 'hover:cursor-default'"
            @click.prevent="queryRateChange(2)"/>
        <star-button :active="rate >= 3" :class="editable ? 'editable-star' : 'hover:cursor-default'"
            @click.prevent="queryRateChange(3)"/>
        <star-button :active="rate >= 4" :class="editable ? 'editable-star' : 'hover:cursor-default'"
            @click.prevent="queryRateChange(4)"/>
        <star-button :active="rate >= 5" :class="editable ? 'editable-star' : 'hover:cursor-default'"
            @click.prevent="queryRateChange(5)"/>
    </div>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'
    import StarButton from '@/components/StarButton.vue'

    const props = defineProps({
        rate: {
            type: Number as PropType<number>,
            required: true
        },

        editable: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    })

    const emit = defineEmits<{
        (event : 'rate-update-queried', newRate : number) : void
    }>()

    function queryRateChange(newRate : number) {
        if(props.editable) {
            emit('rate-update-queried', newRate)
        }
    }
</script>

<style scoped>
    .editable-star {
        @apply transition-transform active:-translate-y-1 hover:cursor-pointer;
    }
</style>