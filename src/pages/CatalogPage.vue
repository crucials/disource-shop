<template>
    <div class="flex items-stretch">
        <filter-sidebar class="" 
            :categories-found="categories" :min-price="minPrice" :max-price="maxPrice" 
            :opened-on-mobile="sidebarOpenedOnMobile" :filters="filters" 
            @selected-types-update-queried="updateSelectedProductTypes"/>
        <main class="relative xl:gap-x-20 m:gap-x-5 py-8 px-16 flex gap-x-7 gap-y-12 items-start flex-wrap justify-between w-full
            xl:justify-center">

            <button class="fixed right-3 bg-soft-black rounded-full w-16 h-16 hidden items-center justify-center
                sm:flex p-2.5 z-10 transition-[top] duration-500" @click="sidebarOpenedOnMobile = !sidebarOpenedOnMobile" 
                :class="sidebarOpenedOnMobile ? 'top-6' : 'top-48'">
                <img src="@/assets/images/filters.svg" alt="Options sliders icon" class="w-full h-full" 
                    v-if="!sidebarOpenedOnMobile">
                <img src="@/assets/images/close.svg" alt="Close icon" class="w-full h-full" 
                    v-else>
            </button>

            <product-card v-for="product in filteredProducts" :key="product.id" :product="product" class="catalog-product"
                @added-to-cart="showSuccessDialog"/>

            <div class="w-full py-28" v-show="filteredProducts.length == 0 && productsLoaded">
                <img src="@/assets/images/empty-box.png" alt="Empty box icon" class="w-28 mx-auto mb-9">
                
                <h3 class="text-2xl text-center mb-3">
                    No products found
                </h3>

                <p class="text-lg text-neutral-600 text-center">
                    Check your search field for typos or turn off some filters
                </p>
            </div>
        </main>

        <success-modal :opened="successModalOpened" @modal-closed="successModalOpened = false">
            Product added to cart
        </success-modal>
    </div>
</template>

<script lang="ts" setup>
    import FilterSidebar from '@/components/catalog-page/FilterSidebar.vue'
    import ProductCard from '@/components/ProductCard.vue'

    import { useProductsCatalog } from '@/composables/products-catalog'
    import type { ProductType } from '@/scripts/types'
    import { ref } from 'vue'

    
    const sidebarOpenedOnMobile = ref(false)
    const successModalOpened = ref(false)

    const { filteredProducts, filters, categories, minPrice, maxPrice, productsLoaded } = useProductsCatalog()

    function updateSelectedProductTypes(selectedTypes : ProductType[]) {
        console.log(selectedTypes)
        filters.value.selectedProductTypes = selectedTypes
    }

    function showSuccessDialog() {
        successModalOpened.value = true
        setTimeout(() => {
            successModalOpened.value = false
        }, 1500)
    }
</script>

<style>
    .catalog-product {
        width: 25%
    }

    @media (max-width: 1000px) {
        .catalog-product {
            min-width: 200px !important;
            width: 20%;
        }
    }

    @media (max-width: 870px) {
        .catalog-product {
            width: 100%;
        }
    }
</style>