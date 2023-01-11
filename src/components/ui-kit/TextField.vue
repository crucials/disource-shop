<template>
    <input :type="fieldType" class="block bg-neutral-100 px-6 py-3 placeholder:text-neutral-400 duration-300
    text-black text-lg rounded-lg transition-border focus:outline-none focus:border-[1px] focus:border-soft-black
    xl:text-sm" @input="queryModelValueUpdate" :value="modelValue">
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    defineProps({
        fieldType: {
            type: String as PropType<'text' | 'number' | 'email' | 'tel' | 'password'>,
            default: 'text'
        },

        modelValue: {
            type: String as PropType<string>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : 'update:modelValue', value : string) : void
    }>()
    function queryModelValueUpdate(event : Event) {
        emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
</script>

<style>

</style>