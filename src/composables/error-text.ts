import { ref } from 'vue'

export function useErrorText() {
    const errorText = ref('')
    const errorTextVisible = ref(false)

    let currentTimeoutId = 0
    function showError(text : string) {
        clearTimeout(currentTimeoutId)
        errorText.value = text
        errorTextVisible.value = true

        currentTimeoutId = setTimeout(() => {
            errorTextVisible.value = false
        }, 2400)
    }

    return { errorText, errorTextVisible, showError }
}