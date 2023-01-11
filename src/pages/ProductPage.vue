<template>
    <main class="py-20 px-16 lg:py-10 sm:px-4" v-if="productLoaded">
        <div class="flex justify-center items-start gap-x-[20%] gap-y-10 mb-32 lg:flex-col lg:items-center">
            <photo-carousel :photos="[ 
                { 
                    src: API_URL + 'images/' + product.photoBaseFilename + '-1.jpg', 
                    altText: product.name
                },
                { 
                    src: API_URL + 'images/' + product.photoBaseFilename + '-2.jpg', 
                    altText: product.name
                } ]" class="min-w-3.5 lg:w-full lg:max-w-md xs:min-w-2.5"/>

            <div class="w-[30%] min-w-2.5 lg:w-full">
                <h5 class="font-semibold text-3xl mb-6">
                    {{ product.name }}
                </h5>

                <p class="font-normal text-lg mb-7">
                    {{ product.description }}
                </p>

                <span class="font-light text-3xl mb-6 block">
                    {{ product.price }} $
                </span>

                <star-rating :rate="product.averageRate" class="w-fit mb-7"/>

                <div class="flex items-center gap-x-6 flex-wrap gap-y-5">
                    <simple-button @click="addProductToCart">
                        Add to cart
                    </simple-button>

                    <a href="#reviews">
                        <simple-button variant="outlined">
                            Go to reviews
                        </simple-button>
                    </a>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-start gap-x-5 gap-y-12 lg:flex-col">
            <review-form :target-product-id="product.id" class="w-1/3 lg:w-full" @review-posted="addReview"/>
            <review-list class="w-1/3 lg:w-full" :reviews="product.reviews" id="reviews"/>
        </div>

        <success-modal :opened="successModalOpened" @modal-closed="successModalOpened = false">
            Product added to cart
        </success-modal>
    </main>
</template>

<script lang="ts" setup>
    import PhotoCarousel from '@/components/product-page/PhotoCarousel.vue'
    import StarRating from '@/components/StarRating.vue'
    import ReviewForm from '@/components/product-page/ReviewForm.vue'
    import ReviewList from '@/components/product-page/ReviewList.vue'

    import { API_URL } from '@/main'
    import router from '@/scripts/router'
    import { ProductType, type Product, type Review } from '@/scripts/types'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import { onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'


    const currentSessionStore = useCurrentSessionStore()
    const { storeInitialized, credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const productLoaded = ref(false)
    const successModalOpened = ref(false)
    const product = ref<Product>({
        id: 0,
        name: '',
        description: '',
        photoBaseFilename: '',
        price: 0,
        type: ProductType.PHONE,
        averageRate: 0,
        reviews: []
    })

    const route = useRoute()

    onMounted(() => {
        if (storeInitialized.value) {
            getProduct()
        }
        else {
            const unwatch = watch(storeInitialized, () => {
                if (storeInitialized.value) {
                    getProduct()
                    unwatch()
                }
            })
        }

        function getProduct() {
            const headers: HeadersInit = loggedIn.value ? { 'Authorization': 'Basic ' + encodeCredentials(credentials.value) } : {}
            fetch(API_URL + 'products/' + route.params.id, {
                headers
            }).then(async response => {
                if(!response.ok) {
                    router.push('/not-found')
                    return
                }

                const productFromServer = await response.json()
                productFromServer.type = ProductType.getByName(productFromServer.type)
                product.value = productFromServer
                productLoaded.value = true
            })
        }
    })

    function addReview(review : Review) {
        product.value.reviews.push(review)
    }

    function addProductToCart() {
        if(!loggedIn.value) {
            router.push('/auth')
            return
        }

        successModalOpened.value = true
        setTimeout(() => {
            successModalOpened.value = false
        }, 2000)

        fetch(API_URL + 'cart/' + product.value.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        })
    }
</script>

<style>

</style>