import { db } from '../utils/firebase-service'

const state = () => ({
    user: {}
})

const getters = {
    user: state => state.user
}

const actions = {
    fetchUser({commit}, payload) {
        const { uid, displayName, email, phoneNumber, photoURL, isLogin } = payload
        const user = {
            uid: uid,
            detail: { displayName, email, phoneNumber, photoURL },
            isLogin
        }
        db.collection('user').doc(payload.uid).set(user)
        commit('setUser', user)
    }
}

const mutations = {
    setUser: (state, payload) => {
        state.user = Object.assign({}, payload)
    }
}

export default { state, getters, actions, mutations }