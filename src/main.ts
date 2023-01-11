import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './scripts/router'
import uiKitComponents from './scripts/ui-kit-components'

import App from './App.vue'

export const API_URL = 'https://disource-api.up.railway.app/'

const app = createApp(App)

uiKitComponents.forEach(component => {
    if(component.__name) {
        app.component(component.__name, component)
    }
})

app.use(router).use(createPinia()).mount('#app')
