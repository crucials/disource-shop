<template>
    <li class="bg-white p-6 transition-shadow duration-300 hover:shadow-main flex justify-between gap-x-7
        items-center rounded-lg min-w-3">
        <router-link :to="'/catalog/' + cartItem.productId" class="w-1/4 min-w-1 lg:min-w-[80px]">
            <img :src="`${API_URL}images/${cartItem.photoBaseFilename}-1.jpg`" :alt="cartItem.name"/>
        </router-link>

        <div class="w-1/2 min-w-2 lg:min-w-1">
            <router-link :to="'/catalog/' + cartItem.productId" class="mb-4">
                <p class="text-xl lg:text-lg">
                    {{ cartItem.name }}
                </p>
            </router-link>

            <div class="flex items-center gap-x-3 mb-3">
                <p class="text-lg">
                    Count: <span class="font-bold">{{ cartItem.count }}</span>
                </p>

                <button class="text-3xl" @click="incrementCount">
                    +
                </button>
            </div>

            <span class="font-light text-2xl mb-5 block">
                {{ cartItem.price * cartItem.count }} $
            </span>

            <button class="remove-button" @click="removeItem">
                <svg width="43" height="49" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    class="overflow-visible">
                    <path class="trash-can-lid-vector"
                        d="M45.9583 7.63333C45.9739 8.34697 45.7143 9.03924 45.2333 9.56667C45.0272 9.81075 44.7669 10.0034 44.4732 10.1292C44.1796 10.2551 43.8606 10.3107 43.5417 10.2917H2.57916C1.96451 10.298 1.36847 10.0809 0.901773 9.68091C0.435072 9.28088 0.129443 8.72505 0.0416633 8.11667C0.026082 7.40303 0.285683 6.71076 0.766663 6.18333C0.97283 5.93925 1.23309 5.74663 1.52676 5.62077C1.82042 5.49492 2.1394 5.4393 2.45833 5.45833H14.5417V3.04167C14.5417 2.40073 14.7963 1.78604 15.2495 1.33283C15.7027 0.879612 16.3174 0.625 16.9583 0.625H29.0417C29.6826 0.625 30.2973 0.879612 30.7505 1.33283C31.2037 1.78604 31.4583 2.40073 31.4583 3.04167V5.45833H43.4208C44.0355 5.45203 44.6315 5.66906 45.0982 6.06909C45.5649 6.46912 45.8706 7.02495 45.9583 7.63333Z"
                        fill="black"/>
                    <path
                        d="M7.53334 15.125C7.19458 15.1233 6.85924 15.1929 6.54909 15.3291C6.23894 15.4654 5.96091 15.6654 5.73303 15.916C5.50515 16.1667 5.33252 16.4625 5.22634 16.7842C5.12015 17.1059 5.08279 17.4463 5.11667 17.7834L8.25834 49.2C8.31845 49.7982 8.59936 50.3525 9.04623 50.7547C9.49309 51.1569 10.0738 51.378 10.675 51.375H35.325C35.9262 51.378 36.5069 51.1569 36.9538 50.7547C37.4006 50.3525 37.6816 49.7982 37.7417 49.2L40.8833 17.7834C40.9172 17.4463 40.8799 17.1059 40.7737 16.7842C40.6675 16.4625 40.4949 16.1667 40.267 15.916C40.0391 15.6654 39.7611 15.4654 39.4509 15.3291C39.1408 15.1929 38.8054 15.1233 38.4667 15.125H7.53334Z"
                        fill="black" />
                </svg>
            </button>
        </div>
    </li>
</template>

<script lang="ts" setup>
    import { API_URL } from '@/main'
    import type { CartItem } from '@/scripts/types'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import type { PropType } from 'vue'

    const props = defineProps({
        cartItem: {
            type: Object as PropType<CartItem>,
            required: true
        }
    })

    const currentSessionStore = useCurrentSessionStore()
    const { credentials } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const emit = defineEmits<{
        (event : string, itemRemoved : CartItem) : void
    }>()
    function removeItem() {
        emit('item-removed', props.cartItem)
        fetch(API_URL + 'cart/' + props.cartItem.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        })
    }

    function incrementCount() {
        emit('count-incremented', props.cartItem)
        fetch(`${API_URL}cart/${props.cartItem.id}/count`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        })
    }
</script>

<style scoped>
    .remove-button {
        @apply transition-transform duration-300 hover:scale-105;
    }

    .trash-can-lid-vector {
        @apply transition-transform duration-300 delay-200;
    }

    .remove-button:hover .trash-can-lid-vector {
        @apply -rotate-12 -translate-x-0.5 -translate-y-0.5;
    }
</style>