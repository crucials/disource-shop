<template>
    <aside class="bg-white border-r-2 border-neutral-200 min-h-screen w-1/5 min-w-2.5 sm:fixed sm:top-0 
        sm:h-screen sm:w-full sm:transition-[left] sm:duration-700 sm:z-10" 
        :class="openedOnMobile ? 'sm:left-0' : 'sm:-left-full'">
        <div class="fixed p-6 w-1/6 min-w-2.5 sm:static sm:w-full">
            <div class="mb-10">
                <h4 class="text-2xl mb-5">
                    Category
                </h4>
            
                <div class="pl-4">
                    <label class="flex gap-x-2.5 items-center mb-3 last:mb-0 hover:cursor-pointer text-neutral-500 
                        hover:text-black text-base 3xl:text-xl transition-colors duration-300" 
                        v-for="category in categoriesFound"
                        :key="category">
                        <input type="checkbox" class="checkbox" :value="category" v-model="selectedCategories">
            
                        {{ category }}
                    </label>
                </div>
            </div>
            
            <div>
                <h4 class="text-2xl mb-5">
                    Price
                </h4>
            
                <double-range-slider :min-value="minPrice" :max-value="maxPrice" v-model:firstValue="filters.minPrice"
                    v-model:secondValue="filters.maxPrice" class="mb-2.5" />
            
                <p class="text-center text-base 3xl:text-xl">
                    {{ filters.minPrice }} $ - {{ filters.maxPrice }} $
                </p>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
    import { ProductType, type Filters } from '@/scripts/types'
    import { ref, watch, type PropType } from 'vue'

    const props = defineProps({
        categoriesFound: {
            type: Array as PropType<string[]>,
            required: true
        },

        minPrice: {
            type: Number as PropType<number>,
            required: true
        },

        maxPrice: {
            type: Number as PropType<number>,
            required: true
        },

        openedOnMobile: {
            type: Boolean as PropType<boolean>,
            required: true
        },

        filters: {
            type: Object as PropType<Filters>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : 'selected-types-update-queried', selectedTypes : ProductType[]) : void
    }>()

    const selectedCategories = ref<string[]>(props.categoriesFound)
    watch(selectedCategories, () => {
        emit('selected-types-update-queried', selectedCategories.value.map(category => ProductType.getByTitle(category)))
    }, { deep: true })
</script>

<style scoped>
    
</style>