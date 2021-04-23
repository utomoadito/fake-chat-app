<template>
  <div class="chat min-h-full bg-gray-100">
    <div class="flex flex-col">
      <div class="flex fixed lg:w-1/3 w-full bg-blue-200 p-6 justify-between z-10">
        <div class="relative">
          <img class="w-16 h-16 rounded-full object-cover" src="@/assets/css/5907.jpg">
          <div class="absolute bg-green-500 w-4 h-4 rounded-full bottom-0 right-0"></div>
        </div>
        <div class="flex-1 pl-2">
          <div class="text-gray-700 text-2xl mt-4 font-semibold">
            Milos
          </div>
        </div>
      </div>
      <div class="flex flex-col pt-32 overflow-auto">
        <div>
          <div class="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-md">
            this is a basic mobile chat layout, build with tailwind css
          </div>
          <div class="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-md float-right">
            this is a basic mobile chat layout, build with tailwind css
          </div>
        </div>
        <div class="flex fixed lg:w-1/3 w-full justify-between bg-blue-100 bottom-0">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  components: {},
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    onSendMsg() {
      console.log(this.msg)
    }
  }
}
</script>
