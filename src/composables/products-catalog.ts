import { API_URL } from '@/main'
import { ProductType, type Filters, type Product } from '@/scripts/types'
import { useSearchQueryStore } from '@/stores/search-query'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

export function useProductsCatalog() {
    const { searchQuery } = storeToRefs(useSearchQueryStore())

    const filters = ref<Filters>({ selectedProductTypes: [], maxPrice: 0, minPrice: 0 })
    const categories = ref<string[]>([])
    const minPrice = ref<number>(0)
    const maxPrice = ref<number>(0)

    const productsLoaded = ref(false)
    const products = ref<Product[]>([])
    fetch(API_URL + 'products').then(async response => {
        (await response.json()).forEach((productFromJson : any) => {
            productFromJson.type = ProductType.getByName(productFromJson.type)
            products.value.push(productFromJson)
        })

        fillCategories()
        fillMinAndMaxPrices()
        filters.value.selectedProductTypes = categories.value
            .map(category => ProductType.getByTitle(category) || ProductType.PHONE)
        filters.value.maxPrice = maxPrice.value
        filters.value.minPrice = minPrice.value

        productsLoaded.value = true
    })

    function fillCategories() {
        products.value.forEach(product => {
            if(!categories.value.includes(product.type.title)) {
                categories.value.push(product.type.title)
            }
        })
    }

    function fillMinAndMaxPrices() {
        let minPriceValue : number = 0
        let maxPriceValue : number = 0
        products.value.forEach(product => {
            const productPrice = product.price

            if(minPriceValue == 0) {
                minPriceValue = productPrice
            }
            else if(productPrice < minPriceValue) {
                minPriceValue = productPrice
            }

            if(maxPriceValue == 0) {
                maxPriceValue = productPrice
            }
            else if(productPrice > maxPriceValue) {
                maxPriceValue = productPrice
            }
        })

        minPrice.value = minPriceValue
        maxPrice.value = maxPriceValue + 1
    }

    const filteredProducts = computed<Product[]>(() => {
        const searchQueryValue = searchQuery.value.toLowerCase()
        return products.value.filter(product => {
            if(!product.name.toLowerCase().includes(searchQueryValue) 
                && !product.description.toLowerCase().includes(searchQueryValue)) {
                return false
            }

            if(!filters.value.selectedProductTypes.includes(product.type)) {
                console.log(product.type)
                return false
            }

            if(product.price >= filters.value.minPrice && product.price <= filters.value.maxPrice) {
                return true
            }
            else {
                console.log(product.price)
                return false
            }
        })
    })

    return { filteredProducts, filters, categories, minPrice, maxPrice, productsLoaded }
}