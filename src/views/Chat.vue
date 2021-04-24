<template>
  <div class="chat min-h-full bg-gray-100">
    <div class="flex flex-col">
      <div class="flex fixed lg:w-1/3 w-full bg-blue-200 p-6 justify-between z-10">
        <div class="relative">
          <img 
            class="w-16 h-16 rounded-full object-cover" 
            :src="userOpponent.detail?.photoURL != null ? userOpponent.detail?.photoURL : require('@/assets/css/5907.jpg')">
          <div v-if="userOpponent.isLogin" class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
        </div>
        <div class="flex-1 pl-2">
          <div class="text-gray-700 text-2xl mt-4 font-semibold">
            {{ userOpponent.detail?.displayName != null ? userOpponent.detail?.displayName : userOpponent.detail?.email.substring(0, userOpponent.detail?.email.indexOf('@')) }}
          </div>
        </div>
      </div>
      <div class="flex flex-col pt-32 overflow-auto">
        <div class="mb-32">
          <div v-for="(chat, index) in filteredChats" :key="index" >
            <div
               v-if="chat.message != '' || chat.base64Img" 
              class="flex-1 bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-md" :class="chat.isOpponent ? 'float-left':'float-right text-right'">
              <img v-if="chat.base64Img" :src="chat.base64Img" />
              <span v-html="chat.message"></span>
            </div>
          </div>
        </div>
        <div class="flex fixed lg:w-1/3 w-full justify-between bg-blue-100 bottom-0">
          <button @click="onAttach" class="bg-blue-400 p-2 ml-2 my-5 rounded-full text-white">+</button>
          <textarea
            v-model="msg"
            class="flex-grow m-2 py-2 px-4 mr-1 rounded-xl border border-gray-300 bg-gray-200 resize-none outline-none"
            rows="1"
            placeholder="Ketik pesan...">
          </textarea>
          <button @click="onSendMsg" class="m-2" style="outline: none;">
            <svg
              class="svg-inline--fa text-blue-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="paper-plane"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282
                 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <attachment-modal 
      :modal="modal"
      :uid="user.uid"
      :uidOpponent="userOpponent.uid"  
      @onClickCancel="onCloseModal" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AttachmentModal from '../components/AttachmentModal.vue'

export default {
  name: 'Chat',
  components: {AttachmentModal},
  data() {
    return {
      msg: '',
      modal: false
    }
  },
  created() {
    this.getUserOpponentByUid(this.$route.params.uid)
    if (this.chats.length <= 0) {
      this.getChats({
        uid: this.user.uid, 
        uidOpponent: this.$route.params.uid
      })
    }
  },
  mounted() {
    // if back button is pressed
    window.onpopstate = () => {
       this.$store.commit('setChats', [])
    }
  },
  computed: {
    ...mapGetters(['user', 'userOpponent', 'chats']),
    filteredChats() {
      let chats = this.chats
      chats = chats.sort((a, b) => {
        return a.created - b.created
      })
      return chats
    }
  },
  methods: {
    ...mapActions(['getUserOpponentByUid', 'saveChat', 'getChats']),
    onSendMsg() {
      this.saveChat({
        uid: this.user.uid, 
        uidOpponent: this.userOpponent.uid, 
        msg: this.msg})
      this.msg = ''
    },
    onAttach() {
      this.modal = true
    },
    onCloseModal(val) {
      this.modal = val
    }
  }
}
</script>
