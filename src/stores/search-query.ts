import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchQueryStore = defineStore('searchQuery', () => {
    const searchQuery = ref('')

    return { searchQuery }
})