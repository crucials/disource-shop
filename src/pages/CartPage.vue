<template>
    <main class="main-content-wrapper">
        <ul class="cart-item-list" v-show="cartItems.length > 0">
            <cart-item-card v-for="cartItem in cartItems" :key="cartItem.id" :cart-item="cartItem"
                class="mb-10 last:mb-0" @item-removed="removeCartItem" @count-incremented="incrementCartItemCount"/>
        </ul>

        <checkout-info :cart-items="cartItems" class="checkout-info" v-show="cartItems.length > 0"/>

        <div class="w-full pt-10 flex items-center justify-center flex-col gap-y-7" 
            v-if="cartItemsLoaded && cartItems.length == 0">
            <img src="@/assets/images/empty.svg" alt="Blank file icon">

            <h3 class="text-center text-3xl">
                Your cart is empty
            </h3>

            <router-link to="/catalog">
                <simple-button>
                    Go to catalog
                </simple-button>
            </router-link>
        </div>
    </main>
</template>

<script lang="ts" setup>
    import CartItemCard from '@/components/cart-page/CartItemCard.vue'
    import CheckoutInfo from '@/components/cart-page/CheckoutInfo.vue'

    import { API_URL } from '@/main'
    import router from '@/scripts/router'
    import type { CartItem } from '@/scripts/types'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import { ref, watch } from 'vue'


    const currentSessionStore = useCurrentSessionStore()
    const { storeInitialized, credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const cartItems = ref<CartItem[]>([])
    const cartItemsLoaded = ref(false)
    
    if (storeInitialized.value) {
        addCartItems()
    }
    else {
        const unwatch = watch(storeInitialized, () => {
            if (storeInitialized.value) {
                addCartItems()
                unwatch()
            }
        })
    }

    function addCartItems() {
        if(!loggedIn.value) {
            router.push('/auth')
            return
        }

        fetch(API_URL + 'cart', {
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        }).then(async response => {
            cartItems.value = await response.json()
            cartItemsLoaded.value = true
        })
    }

    function removeCartItem(itemToRemove : CartItem) {
        cartItems.value = cartItems.value.filter(item => item.id != itemToRemove.id)
    }

    function incrementCartItemCount(itemToRemove : CartItem) {
        itemToRemove.count++
    }
</script>

<style>
    .main-content-wrapper {
        @apply bg-white flex-grow flex justify-between gap-x-5 items-start py-9 px-14;
        background-image: url('@/assets/images/shopping-cart.png');
        background-repeat: no-repeat;
        background-size: max(28%, 200px);
        background-position: right -2% bottom -2%;
        background-attachment: fixed;
    }

    .checkout-info {
        width: 29%;
    }

    .cart-item-list {
        @apply w-5/12 min-w-3;
    }

    @media (max-width: 850px) {
        .main-content-wrapper {
            @apply flex-col-reverse items-center gap-y-8;
        }

        .checkout-info {
            @apply w-full max-w-md;
        }

        .cart-item-list {
            @apply w-full flex flex-wrap justify-center gap-x-4;
        }

        .cart-item-list li {
            width: 48%;
        }
    }
</style>