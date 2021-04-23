import { createStore } from 'vuex'
import auth from './auth'
import chat from './chat'

export const store = createStore({
  modules: {
    auth,
    chat
  }
})
