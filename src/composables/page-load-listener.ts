import { onMounted, ref } from 'vue'

export function usePageLoadListener() {
    const pageLoaded = ref(false)
    onMounted(() => {     
        setTimeout(() => {
            pageLoaded.value= true
        })
    })

    return { pageLoaded }
}