<template>
  <Header/>
  <div class="site-page">
    <router-view/>
  </div>
  <Footer/>
  <Loader v-if="$store.state.isLoading"/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'
export default {
  components: { Header, Footer, Loader },
  name: 'App',
  beforeMount () {
    this.$store.commit('loadAccount')
    this.$store.commit('setIsLoading', true)
    setTimeout(() => { this.$store.commit('setIsLoading', false) }, 5000)
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
