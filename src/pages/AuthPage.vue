<template>
    <main class="py-32 relative overflow-hidden">
        <img src="@/assets/images/auth-page-bg.svg" alt="Background black decoration shape" class="absolute w-full
            transition-all duration-700 left-0 top-0 min-w-8" :class="pageLoaded ? 'scale-x-100' : 'scale-x-0'">

        <form class="relative w-1/3 py-9 px-12 bg-white shadow-main mx-auto rounded-lg min-w-4 xs:min-w-3">
            <h3 class="flex items-center gap-x-3.5 justify-center text-3xl mb-5">
                Welcome <img src="@/assets/images/hand.svg" alt="Waving hand icon">
            </h3>

            <p class="text-lg text-neutral-500 text-center mb-10 3xl:text-xl">
                Enter your credentials and continue shopping
            </p>

            <label class="text-black text-base mx-auto mb-6 block 3xl:text-lg">
                <p class="mb-3">
                    Username
                </p>
                <text-field class="w-full" v-model="usernameFieldText"/>
            </label>

            <label class="text-black text-base mx-auto block mb-6 3xl:text-lg">
                <p class="mb-3">
                    Password
                </p>
                <text-field class="w-full" v-model="passwordFieldText" :fieldType="hidePassword ? 'password' : 'text'"/>
            </label>

            <label class="flex gap-x-2.5 items-center mb-14 hover:cursor-pointer text-neutral-500 
                hover:text-black text-lg 3xl:text-xl transition-colors duration-300">
                <input type="checkbox" class="checkbox" v-model="hidePassword">
                Hide password
            </label>

            <div class="flex justify-center items-center gap-x-6 flex-wrap gap-y-7">
                <simple-button @click.prevent="logIn">Log in</simple-button>
                <simple-button variant="outlined" @click.prevent="signUp">Sign up</simple-button>
            </div>

            <transition name="error-fade">
                <p class="text-black text-base text-center mt-5" v-if="errorTextVisible">
                    {{ errorText }}
                </p>
            </transition>
        </form>
    </main>
</template>

<script lang="ts" setup>
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import { ref } from 'vue'
    import router from '@/scripts/router'
    import { usePageLoadListener } from '@/composables/page-load-listener'
    import { useErrorText } from '@/composables/error-text'
    import { API_URL } from '@/main'

    const usernameFieldText = ref('')
    const passwordFieldText = ref('')
    const { errorText, errorTextVisible, showError } = useErrorText()
    const hidePassword = ref(true)

    const { pageLoaded } = usePageLoadListener()

    const currentSessionStore = useCurrentSessionStore()
    const { credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { checkCredentials } = currentSessionStore    

    function logIn() {
        const enteredUsername = usernameFieldText.value
        const enteredPassword = passwordFieldText.value
        checkCredentials({ username: enteredUsername, password: enteredPassword })
            .then(credentialsValid => {
                if (credentialsValid) {
                    credentials.value.username = enteredUsername
                    credentials.value.password = enteredPassword
                    loggedIn.value = true

                    router.push('/')
                }
                else {
                    showError('Username or password is incorrect')
                }
            }).catch(() => {
                showError('Username or password is incorrect')
            })
    }

    function signUp() {
        const enteredUsername = usernameFieldText.value.trim()
        const enteredPassword = passwordFieldText.value.trim()

        if(enteredUsername.length <= 4 || enteredPassword.length <= 4) {
            showError('Your username and password must be more than 4 characters long')
            return
        }

        fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword })
        }).then(response => {
            if(response.ok) {
                credentials.value.username = enteredUsername
                credentials.value.password = enteredPassword
                loggedIn.value = true

                router.push('/')
            }
            else {
                showError('Entered username is already in use. You can append some numbers or other ' + 
                    'characters to make it unique')
            }
        }).catch(() => showError('Failed to create an account. Try again later'))
    }
</script>

<style>
    .error-fade-enter-active, .error-fade-leave-active {
        transition: opacity 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .error-fade-enter-from, .error-fade-leave-to {
        opacity: 0;
    }
</style>