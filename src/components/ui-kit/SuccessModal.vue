<template>
    <div class="modal-backdrop" :class="{ 'modal-backdrop-opened': opened }" @click="closeModal">
        <dialog class="success-modal" :open="opened" @click.stop>
            <svg width="161" height="107" viewBox="0 0 161 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.06066" y1="49.597" x2="57.3093" y2="105.846" stroke="black" stroke-width="3" />
                <line x1="55.1493" y1="105.792" x2="159.002" y2="1.93933" stroke="black" stroke-width="3" />
            </svg>
        
            <p class="text-3xl text-center">
                <slot></slot>
            </p>
        
            <simple-button @click.prevent="closeModal">
                Close
            </simple-button>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    defineProps({
        opened: {
            type: Boolean as PropType<boolean>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : 'modal-closed') : void
    }>()
    function closeModal() {
        emit('modal-closed')
    }
</script>

<style scoped>
    .success-modal {
        @apply fixed w-1/4 px-5 py-12 justify-center flex items-center gap-y-11 flex-col transition-transform duration-300 
            bg-white z-50 mx-auto top-1/2 -translate-y-1/2 min-w-3 rounded-lg;
    }

    .modal-backdrop {
        @apply fixed h-screen top-0 left-0 bg-black/20 w-0;
    }

    .success-modal:not([open]) {
        @apply flex scale-0;
    }

    .success-modal[open] {
        @apply scale-100;
    }

    .modal-backdrop-opened {
        @apply w-full;
    }
</style>