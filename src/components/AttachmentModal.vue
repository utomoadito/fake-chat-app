<template>
  <div>
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="modal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <transition
              enter-active-class="ease-out duration-300"
              enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
              <div 
                v-if="modal" 
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" 
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="p-3">
                  <div class="flex flex-col overflow-auto mb-8">
                    <div class="text-gray-700 mb-2">
                      <label class="block mb-1 font-semibold text-lg" for="base64-img">Kode Base64</label>
                      <input 
                        v-model="base64Img"
                        class="w-full h-10 px-3 text-base placeholder-gray-600 border focus:shadow-outline" 
                        type="text" placeholder="Masukkan Kode Base64 Image" id="base64-img"/>
                    </div>
                    <div class="text-gray-700 mb-2">
                      <label class="block mb-1 font-semibold text-lg" for="file-img">Upload File Gambar</label>
                      <img :src="fileImg" />
                      <input
                        @change="onUploadImg"
                        class="w-full h-10 px-3 text-base placeholder-gray-600 border focus:shadow-outline" 
                        type="file" id="file-img"/>
                    </div>
                  </div>
                  <button 
                    @click="onSendMsg"
                    class="mt-5 text-sm font-semibold bg-green-600 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-green-800">
                    Kirim
                  </button>
                  <button 
                    @click="onClickCancel"
                    class="mt-5 text-sm font-semibold bg-red-600 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-red-800">
                    Batal
                  </button>
                </div>
              </div>
            </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AttachmentModal',
  props: {
    modal: Boolean,
    uid: String,
    uidOpponent: String
  },
  data() {
    return {
      base64Img: null,
      fileImg: null,
    }
  },
  methods: {
    ...mapActions(['saveChat']),
    onClickCancel() {
      this.base64Img = null
      this.$emit('onClickCancel', false)
    },
    onUploadImg(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.fileImg = e.target.result
      }
    },
    onSendMsg() {
      this.saveChat({
        uid: this.uid, 
        uidOpponent: this.uidOpponent,
        base64Img: this.base64Img != null ? this.base64Img : this.fileImg
      })
      this.base64Img = null
      this.fileImg = null
      this.$emit('onClickCancel', false)
    }
  }
}
</script>
