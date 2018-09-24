<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        top
      </router-link>
      <router-link to="about">
        about
      </router-link>
      <router-link to="content">
        content
      </router-link>
    </div>
    <img src="./assets/logo.png">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
