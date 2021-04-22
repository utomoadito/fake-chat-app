<template>
  <div class="home">
    <div class="flex flex-col">
      <div class="flex bg-blue-200 p-6 justify-between">
        <div class="relative">
          <img class="w-16 h-16 rounded-full object-cover" src="https://foto.kontan.co.id/Pxf2oqlelEsOODE689_ifPPaWkM=/smart/2021/02/15/1074687210p.jpg">
          <div class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
        </div>
        <button 
          @click="logout"
          class="items-center p-3 font-medium mr-2 text-center bg-red-500 hover:bg-red-700 focus:outline-none focus:bg-red-700">
          <span class="text-white uppercase">Keluar</span>
        </button>
      </div>
      <div class="flex flex-col mt-3 overflow-auto">
        <div class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-700">
          <div class="relative">
            <img class="w-16 h-16 rounded-full object-cover" src="https://wallpapercave.com/wp/wp5291411.png">
            <div class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
          </div>
          <div class="flex-1 pl-2">
            <div class="text-gray-700 text-lg font-semibold">
              Milos
            </div>
            <div class="text-gray-600">
              Hey! Lets dance with me!
            </div>
          </div>
          <div class="text-lg font-bold">></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth, db } from '../utils/firebase-service'

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    logout() {
      db.collection('user').doc(this.user.uid).update({isLogin: false})
      auth.signOut().then(() => {
        this.$router.push('/login')
      }).catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>
