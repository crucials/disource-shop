<template>
    <form class="min-w-3">
        <h5 class="font-semibold text-3xl mb-7">
            Post a review
        </h5>
    
        <textarea class="block bg-neutral-100 px-6 py-3 placeholder:text-neutral-400 duration-300
            text-black text-lg rounded-lg transition-border focus:outline-none focus:border-[1px] 
            focus:border-soft-black w-full mb-5" rows="5" placeholder="Review text" 
            v-model="newReview.text"></textarea>
    
        <star-rating :rate="newReview.rate" editable @rate-update-queried="updateNewReviewRate" class="w-fit mb-7"/>

        <simple-button @click.prevent="postReview">
            Post
        </simple-button>

        <transition name="error-fade">
            <p class="text-black text-base mt-5" v-if="errorTextVisible">
                {{ errorText }}
            </p>
        </transition>

        <success-modal :opened="successModalOpened" @modal-closed="successModalOpened = false">
            Successfully added new review
        </success-modal>
    </form>
</template>

<script lang="ts" setup>
    import StarRating from '../StarRating.vue'

    import { ref, type PropType } from 'vue'
    import type { Review } from '@/scripts/types'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import { useErrorText } from '@/composables/error-text'
    import router from '@/scripts/router'
    import { API_URL } from '@/main'

    const props = defineProps({
        targetProductId: {
            type: Number as PropType<number>,
            required: true
        }
    })

    const currentSessionStore = useCurrentSessionStore()
    const { credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const { errorText, errorTextVisible, showError } = useErrorText()
    const successModalOpened = ref(false)

    const newReview = ref<Review>({
        id: 0,
        rate: 0,
        text: '',
        authorUsername: credentials.value.username,
        likedUsernames: []
    })
    function updateNewReviewRate(rate : number) {
        newReview.value.rate = rate
    }

    const emit = defineEmits<{
        (event : 'review-posted', review : Review) : void
    }>()
    function postReview() {
        const newReviewValue = newReview.value

        if(!loggedIn.value) {
            router.push('/auth')
            return
        }

        if(newReviewValue.rate == 0) {
            showError('Set your rate to post your review.')
            return
        }
        
        fetch(`${API_URL}products/${props.targetProductId}/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview.value)
        }).then(async response => {
            if(response.ok) {
                newReviewValue.id = Number(await response.text())
                emit('review-posted', newReviewValue)
                successModalOpened.value = true
                setTimeout(() => {
                    successModalOpened.value = false
                }, 1500)
            }
            else {
                showError('You can\'t post more the one review on one product.')
            }
        }).catch(() => {
            showError('Something went wrong while posting your review. Try again later.')
        })
    }
</script>

<style scoped>
    .error-fade-enter-active, .error-fade-leave-active {
        transition: opacity 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .error-fade-enter-from, .error-fade-leave-to {
        opacity: 0;
    }
</style>