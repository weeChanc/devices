<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {

    }
  }
</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/material-icons@0.2.3/iconfont/material-icons.min.css';
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>
