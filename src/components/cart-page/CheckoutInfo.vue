<template>
    <div class="p-10 bg-neutral-100 rounded-lg min-w-3">
        <h6 class="text-2xl mb-3.5">
            Total:
        </h6>

        <span class="font-semibold text-4xl mb-6 block">
            {{ totalPrice }} $
        </span>

        <div class="flex items-start gap-x-3.5 mb-8">
            <img src="@/assets/images/phone.svg" alt="Phone icon">

            <p class="text-lg">
                If you have any questions about delivery, contact us through this phone number:
                <a href="tel:+67200000000" class="font-semibold">
                    +6720000000000
                </a>
            </p>
        </div>

        <simple-button>
            Checkout
        </simple-button>
    </div>
</template>

<script lang="ts" setup>
    import type { CartItem } from '@/scripts/types'
    import { computed, ref, type PropType } from 'vue'

     const props = defineProps({
        cartItems: {
            type: Array as PropType<CartItem[]>,
            required: true
        }
    })

    const totalPrice = computed(() => {
        if(props.cartItems.length == 0) {
            return 0
        }

        return props.cartItems.map(item => item.price * item.count).reduce((price1, price2) => price1 + price2)
    })
</script>

<style>

</style>