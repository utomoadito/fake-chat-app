<template>
  <div class="home min-h-full bg-gray-100">
    <div class="flex flex-col">
      <div class="flex fixed lg:w-1/3 w-full bg-blue-200 p-6 justify-between z-10">
        <div class="relative">
          <img class="w-16 h-16 rounded-full object-cover" :src="user.detail.photoURL != null ? user.detail.photoURL : require('@/assets/css/5907.jpg')">
          <div v-if="user.isLogin" class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
        </div>
        <button 
          @click="logout"
          class="items-center p-3 font-medium mr-2 text-center bg-red-500 hover:bg-red-700 focus:outline-none focus:bg-red-700">
          <span class="text-white uppercase">Keluar</span>
        </button>
      </div>
      <div class="flex flex-col pt-32 overflow-auto">
        <div
          v-for="(userDetail, index) in users" :key="index" 
          @click="onChatPage(userDetail.uid)"
          class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-300 cursor-pointer">
          <div class="relative">
            <img class="w-16 h-16 rounded-full object-cover" :src="userDetail.detail.photoURL != null ? userDetail.detail.photoURL : require('@/assets/css/5907.jpg')">
            <div v-if="userDetail.isLogin" class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
          </div>
          <div class="flex-1 pl-2">
            <div class="text-gray-700 text-lg font-semibold">
              {{ userDetail.detail.displayName != null ? userDetail.detail.displayName : userDetail.detail.email.substring(0, userDetail.detail.email.indexOf('@')) }}
            </div>
            <div class="text-gray-600">
              Hey! I am using fake chat app!
            </div>
          </div>
          <div class="text-lg font-bold">></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth, db } from '../utils/firebase-service'

export default {
  name: 'Home',
  components: {},
  created() {
    if (this.users?.length <= 0) {
      this.fetchAllUsers(this.user.uid)
    }
  },
  computed: {
    ...mapGetters(['user', 'users'])
  },
  methods: {
     ...mapActions(['fetchAllUsers']),
    logout() {
      db.collection('user').doc(this.user.uid).update({isLogin: false})
      auth.signOut().then(() => {
        this.$router.push('/login')
      }).catch(error => {
        alert(error.message)
      })
    },
    onChatPage(uid) {
      this.$router.push('/chat/' + uid)
    }
  }
}
</script>
