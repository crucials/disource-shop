<template>
    <article class="pb-6 border-b border-b-black/30 flex justify-between gap-x-5 items-center min-w-2.5">
        <div>
            <span class="text-black/50 block text-sm mb-2.5">
                {{ review.authorUsername }}
            </span>
            
            <star-rating :rate="review.rate" class="w-fit mb-6" />
            
            <p class="text-base">
                {{ review.text }}
            </p>
        </div>

        <div class="flex items-center gap-x-4">
            <span class="text-xl font-semibold text-soft-black">
                {{ review.likedUsernames.length }}
            </span>
            
            <button @click="like">
                <svg width="39px" height="39px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="like">
                        <path id="vector" class="transition-colors duration-300"
                            :class="reviewLiked ? 'fill-soft-black stroke-white' : 'fill-white stroke-soft-black'"
                            d="M7.66003 10.1022L11.76 4.00221C12.16 3.40221 13.16 3.00221 13.96 3.30221C14.86 3.60221 15.46 4.60221 15.26 5.50221L14.76 8.70221C14.66 9.40221 15.16 9.90221 15.76 9.90221H19.76C21.26 9.90221 22.1801 11.0522 21.66 12.5022C21.14 13.9522 20.6801 16.5522 19.26 18.8022C18.6102 19.8318 17.8975 20.5522 16.6801 20.5522C12.6801 20.5522 6.66003 20.5522 6.66003 20.5522"
                            stroke-width="1.5" stroke-miterlimit="10" />
            
                        <path id="rec" class="transition-colors duration-300"
                            :class="reviewLiked ? 'fill-soft-black stroke-white' : 'fill-white stroke-soft-black'"
                            d="M2.18005 10.5522C2.18005 9.99996 2.62777 9.55225 3.18005 9.55225H6.68005C7.23234 9.55225 7.68005 9.99996 7.68005 10.5522V20.5522H3.18005C2.62777 20.5522 2.18005 20.1045 2.18005 19.5522V10.5522Z"
                            stroke-width="1.5" />
                    </g>
                </svg>
            </button>
        </div>
    </article>
</template>

<script lang="ts" setup>
    import StarRating from '../StarRating.vue'

    import type { Review } from '@/scripts/types'
    import { ref, toRefs, type PropType } from 'vue'
    import { useCurrentSessionStore } from '@/stores/current-session'
    import { storeToRefs } from 'pinia'
    import router from '@/scripts/router'
    import { API_URL } from '@/main'


    const props = defineProps({
        review: {
            type: Object as PropType<Review>,
            required: true
        }
    })
    const { review } = toRefs(props)

    const currentSessionStore = useCurrentSessionStore()
    const { credentials, loggedIn } = storeToRefs(currentSessionStore)
    const { encodeCredentials } = currentSessionStore

    const reviewLiked = ref(review.value.likedUsernames.includes(credentials.value.username))

    function like() {
        if(!loggedIn.value) {
            router.push('/auth')
            return
        }

        toggleLike()
        fetch(`${API_URL}reviews/${review.value.id}/like`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials(credentials.value)
            }
        }).then(response => {
            if(!response.ok) {
                toggleLike()
            }
        })
    }

    function toggleLike() {
        reviewLiked.value = !reviewLiked.value
        if(reviewLiked.value == false) {
            review.value.likedUsernames = review.value.likedUsernames
                    .filter(username => username != credentials.value.username)
        }
        else if(reviewLiked.value == true) {
            review.value.likedUsernames.push(credentials.value.username)
        }
    }
</script>

<style>

</style>