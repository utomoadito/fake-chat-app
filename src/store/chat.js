import { db } from '../utils/firebase-service'

const state = () => ({
    users: []
})

const getters = {
    users: state => state.users
}

const actions = {
    fetchAllUsers({commit}, uid) {
        db.collection('user').onSnapshot(usersCollection => {
            let users = []
            usersCollection.forEach(data => {
                if (data.data().uid != uid) {
                    users.push(data.data())
                }
            })
            commit('setUsers', users)
        })
    }
}

const mutations = {
    setUsers: (state, users) => {
        state.users = users
    }
}

export default { state, getters, actions, mutations }