<template>
  <Header/>
  <div class="site-page">
    <router-view/>
  </div>
  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: { Header, Footer },
  name: 'App',
  beforeMount () {
    console.log('aqui')
    this.$store.commit('loadAccount')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  margin: 0;
  color: lightseagreen;
}
a {
  text-decoration: none;
}
.site-page{
  min-height: 86.3vh;
}
</style>
