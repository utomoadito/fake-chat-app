<template>
  <div class="flex flex-wrap p-6">
    <div class="w-full relative">
      <form>
        <div class="mx-auto max-w-lg">
          <div class="py-2">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="block text-medium font-semibold text-gray-500" for="username">Email</label>
                <input 
                  class="w-full p-2 text-gray-700 focus:border-b-3 border-indigo-500 outline-none shadow-md" 
                  type="email" name="email" v-model="email" @keyup.prevent="isEmail" required>
                <span v-if="errMsgEmail" class="font-bold text-red-500">{{ errMsgEmail }}*</span>
              </div>
              <div class="mb-3">
                <label class="block text-medium font-semibold text-gray-500" for="password">Password</label>
                <div class="relative">
                  <input 
                    class="w-full p-2 text-gray-700 focus:border-b-3 border-indigo-500 outline-none shadow-md" 
                    name="password" type="password" v-model="password" @keyup.prevent="isPassword" required>
                  <span v-if="errMsgPassword" class="font-bold text-red-500">{{ errMsgPassword }}*</span>
                </div>
              </div>
              <div class="mt-20">          
                <button
                  @click="isSubmit = 'login'"
                  type="submit"
                  class="mb-4 text-sm font-semibold 
                  bg-blue-700 w-full text-white
                  px-6 py-3 block shadow-xl hover:text-white hover:bg-blue-900"
                  :class="formValid ? '' : 'disabled:opacity-50'"
                  :disabled="formValid ? false : true"
                >
                  <span>Masuk</span>
                </button>
                <div class="text-center mb-4 font-semibold"><span>Atau</span></div>
                <button
                  @click="isSubmit = 'register'"
                  type="submit"
                  class="mb-4 text-sm font-semibold 
                  bg-green-700 w-full text-white
                  px-6 py-3 block shadow-xl hover:text-white hover:bg-green-900"
                  :class="formValid ? '' : 'disabled:opacity-50'"
                  :disabled="formValid ? false : true"
                >
                  <span>Daftar</span>
                </button>
              </div>       
            </form>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../utils/firebase-service'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errMsgEmail: '',
      errMsgPassword: '',
      formValid: false,
      isSubmit: ''
    }
  },
  methods: {
    isEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) { //eslint-disable-line
        this.errMsgEmail = ''
        this.formValid = true
      } else {
        this.errMsgEmail = 'Masukkan email yang valid'
        this.formValid = false
      }
    },
    isPassword() {
      if (this.password.length >= 8) {
        this.errMsgPassword = ''
        this.formValid = true
      } else {
        this.errMsgPassword = 'Password minimal harus memiliki 8 karakter'
        this.formValid = false
      }
    },
    onSubmit() {
      if (this.formValid) {
        if (this.isSubmit == 'register') {
          auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
            alert('Berhasil Mendaftarkan Akun! Silahkan Login Kembali')
            db.collection('user').doc(user.user.uid).set({
              isLogin: false,
              /* detail: { 
                displayName: this.email.substring(0, this.email.indexOf('@')), 
              } */
            })
            this.$router.go('/login')
          }).catch(error => {
            alert(error.message)
          })
        } else if (this.isSubmit == 'login') {
          auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
            this.$router.push('/')
          })
          .catch(error => {
            alert(error.message)
          })
        }
      }
    }
  }
}
</script>
