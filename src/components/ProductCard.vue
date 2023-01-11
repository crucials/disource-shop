<template>
    <article class="p-6 transition-shadow duration-300 bg-white rounded-lg flex flex-col items-center gap-y-2.5 
        hover:shadow-main min-w-2.5">
        <router-link :to="'/catalog/' + product.id" class="relative block w-1/2">
            <img :src="`${API_URL}images/${product.photoBaseFilename}-1.jpg`" alt="Product photo" class="object-cover">
        </router-link>

        <router-link :to="'/catalog/' + product.id" class="block text-center 3xl:text-xl">
            {{ product.name }}
        </router-link>

        <p class="font-normal text-base text-black/50 text-center mb-3.5 3xl:text-lg">
            {{ product.type.title }}
        </p>

        <p class="font-semibold text-xl text-black text-center mb-3.5">
            {{ product.price }} $
        </p>

        <star-rating :rate="product.averageRate" class="mb-3.5"/>

        <simple-button @click="addProductToCart">
            Buy
        </simple-button>
    </article>
</template>

<script lang="ts" setup>
    import StarRating from '@/components/StarRating.vue'

    import type { PropType } from 'vue'
    import type { Product } from '@/scripts/types'
    import { API_URL } from '@/main'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import router from '@/scripts/router'


    const props = defineProps({
        product: {
            type: Object as PropType<Product>,
            required: true
        }
    })

    const currentSessionStore = useCurrentSessionStore()
    const { credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const emit = defineEmits<{
        (event : 'added-to-cart') : void
    }>()
    function addProductToCart() {
        if(!loggedIn.value) {
            router.push('/catalog/' + props.product.id)
            return
        }

        emit('added-to-cart')
        fetch(API_URL + 'cart/' + props.product.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        })
    }
</script>

<style scoped>
    
</style>