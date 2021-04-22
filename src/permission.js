import router from './router'
import { auth } from './utils/firebase-service'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    if (auth.currentUser) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})
