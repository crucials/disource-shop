<template>
    <nav class="bg-white py-6 px-7 flex justify-between gap-x-4 items-center flex-wrap m:justify-center gap-y-6">
        <router-link to="/">
            <img src="@/assets/images/logo.svg" alt="Disource logo">
        </router-link>

        <form class="flex gap-x-5 justify-center items-center w-2/5 min-w-3 m:w-full">
            <text-field fieldType="text" placeholder="Product's name or company" v-model="searchQuery" class="w-3/5"/>
            <simple-button @click.prevent="router.push('/catalog')">Search</simple-button>
        </form>

        <ul class="flex justify-center items-center gap-x-10">
            <li>
                <router-link to="/catalog" class="menu-link">
                    Catalog
                    <img src="@/assets/images/monitor.svg" alt="Monitor icon" class="transition-transform duration-300">
                </router-link>
            </li>

            <li>
                <router-link to="/cart" class="menu-link">
                    Cart
                    <img src="@/assets/images/cart.svg" alt="Cart icon" class="transition-transform duration-300">
                </router-link>
            </li>

            <li>
                <router-link to="/auth" class="menu-link" v-show="!loggedIn">
                    Log in
                </router-link>

                <button class="menu-link" v-show="loggedIn" @click="logout">
                    Logout
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { useSearchQueryStore } from '@/stores/search-query'
    import { storeToRefs } from 'pinia'
    import { ref } from 'vue'
    import router from '@/scripts/router'

    const { searchQuery } = storeToRefs(useSearchQueryStore())
    const { credentials, loggedIn } = storeToRefs(useCurrentSessionStore())

    function logout() {
        credentials.value.password = ''
        credentials.value.username = ''
        loggedIn.value = false
        window.location.reload()
    }
</script>

<style scoped>
    .menu-link {
        @apply flex gap-x-2.5 text-black text-lg xs:text-base;
    }

    .menu-link:hover img {
        @apply scale-110;
    }
</style>