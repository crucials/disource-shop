<template>
    <main class="">
        <hero-header/>

        <div class="py-8 px-16 flex gap-x-5 gap-y-6 items-start" 
            :class="recommendedProducts.length < 4 ? 'justify-center gap-x-[13%]' : 
            'justify-between xl:justify-center xl:flex-wrap'">

            <product-card v-for="product in recommendedProducts" :key="product.id" :product="product"
                class="w-1/5 sm:w-4/5" @added-to-cart="showSuccessDialog"/>

            <success-modal :opened="successModalOpened" @modal-closed="successModalOpened = false">
                Product added to cart
            </success-modal>
        </div>
    </main>
</template>

<script lang="ts" setup>
    import HeroHeader from '@/components/main-page/HeroHeader.vue'
    import ProductCard from '@/components/ProductCard.vue'

    import { API_URL } from '@/main'
    import  type { Product } from '@/scripts/types'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import { ref, watch } from 'vue'


    const currentSessionStore = useCurrentSessionStore()
    const { storeInitialized, credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const recommendedProducts = ref<Product[]>([])

    const successModalOpened = ref(false)

    if (storeInitialized.value) {
        addRecommendedProducts()
    }
    else {
        const unwatch = watch(storeInitialized, () => {
            if (storeInitialized.value) {
                addRecommendedProducts()

                unwatch()
            }
        })
    }

    function addRecommendedProducts() {
        const headers: HeadersInit = loggedIn.value ? { 'Authorization': 'Basic ' + encodeCredentials(credentials.value) } : {}
        fetch(API_URL + 'products/recommended', {
            headers
        }).then(async response => {
            recommendedProducts.value = await response.json()
        })
    }

    function showSuccessDialog() {
        successModalOpened.value = true
        setTimeout(() => {
            successModalOpened.value = false
        }, 1500)
    }
</script>

<style>
    
</style>