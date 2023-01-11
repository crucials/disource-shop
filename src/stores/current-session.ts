import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { API_URL}  from '@/main'
import type { Credentials } from '@/scripts/types'

export const useCurrentSessionStore = defineStore('currentSession', () => {
    const credentials = ref<Credentials>({ username: '', password: '' })
    const loggedIn = ref(false)
    const storeInitialized = ref(false)

    const credentialsFromCookies = localStorage.getItem('credentials')
    if(credentialsFromCookies != null && credentialsFromCookies != 'Og==') {
        const decodedCredentials = decodeCredentials(credentialsFromCookies)
        checkCredentials(decodedCredentials).then(credentialsValid => {
            if(credentialsValid) {
                credentials.value.username = decodedCredentials.username,
                credentials.value.password = decodedCredentials.password
                loggedIn.value = true
            }

            storeInitialized.value = true
        })
    }
    else {
        storeInitialized.value = true
    }

    watch([ credentials, loggedIn ], () => {
        localStorage.setItem('credentials', encodeCredentials(credentials.value))
    }, { deep: true })

    async function checkCredentials(credentials : Credentials) : Promise<boolean> {
        try {
            const response = await fetch(API_URL + 'products', {
                headers: {
                    'Authorization': 'Basic ' + encodeCredentials(credentials),
                }
            })

            return response.ok
        }
        catch (error) {
            throw new Error()
        }
    }

    function encodeCredentials(credentials : Credentials) {
        return btoa(`${credentials.username}:${credentials.password}`)        
    }

    function decodeCredentials(encodedCredentials : string) : Credentials {
        const decodedCredentials = atob(encodedCredentials).split(':')
        return { username: decodedCredentials[0], password: decodedCredentials[1] }
    }

    return { storeInitialized, credentials, loggedIn, checkCredentials, encodeCredentials, decodeCredentials }
})