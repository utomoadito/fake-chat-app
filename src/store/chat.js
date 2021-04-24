import { db } from '../utils/firebase-service'

const state = () => ({
    users: [],
    userOpponent: {},
    chats: []
})

const getters = {
    users: state => state.users,
    userOpponent: state => state.userOpponent,
    chats: state => state.chats
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
    },
    getUserOpponentByUid({commit}, uid) {
        db.doc(`user/${uid}`).onSnapshot(user => {
            commit('setUserOpponent', user.data())
        })
    },
    saveChat({commit}, data) {// eslint-disable-line
        db.collection('chats').doc().set({
            created_at: new Date(),
            uid: data.uid,
            uidOpponent: data.uidOpponent,
            message: data.msg
        })
        db.collection('chats').doc().set({
            created_at: new Date(),
            uid: data.uidOpponent,
            uidOpponent: data.uid,
            isOpponent: true,
            message: data.msg
        })
    },
    getChats({commit}, data) {
        db.collection('chats')
        .where('uid', '==', data.uid).where('uidOpponent', '==', data.uidOpponent)
        .onSnapshot(chatsCollection => {
            let chats = []
            chatsCollection.forEach(chat => {
                let chatData = chat.data()
                chatData.created = chat.data().created_at.toDate()
                chats.push(chatData)
            })
            commit('setChats', chats)
        })
    }
}

const mutations = {
    setUsers: (state, users) => {
        state.users = users
    },
    setUserOpponent: (state, user) => {
        state.userOpponent = Object.assign({}, user)
    },
    setChats: (state, chats) => {
        state.chats = chats
    }
}

export default { state, getters, actions, mutations }