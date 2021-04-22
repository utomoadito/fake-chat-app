import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import 'core-js'
import './assets/css/tailwind.css'
import './permission'
import { auth } from './utils/firebase-service'

let app
auth.onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App)
                .use(store)
                .use(router)
        app.mount('#app')
    }
    if (user) {
        user.isLogin = true
        store.dispatch('fetchUser', user)
    }
})
