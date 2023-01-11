import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage
        },

        {
            path: '/not-found',
            component: NotFoundPage
        },

        {
            path: '/auth',
            component: AuthPage
        },

        {
            path: '/catalog',
            component: CatalogPage 
        },

        {
            path: '/catalog/:id',
            component: ProductPage
        },

        {
            path: '/cart',
            component: CartPage
        },

        { 
            path: '/:pathMatch(.*)*', 
            redirect: '/not-found' 
        }
    ]
})