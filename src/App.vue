<template>
  <div id="app">
    <div class="w-full bg-black flex justify-center">
      <div class="flex lg:w-1/3 w-full">
        <div class="container min-h-screen max-w-full mx-auto bg-white font-sans">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
