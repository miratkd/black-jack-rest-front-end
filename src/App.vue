<template>
  <Header/>
  <div class="site-page">
    <router-view v-if="!isLoading"/>
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
  data () {
    return {
      isLoading: true
    }
  },
  beforeMount () {
    this.$store.state.accessToken = JSON.parse(localStorage.getItem('accessToken'))
    this.$store.state.refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
    if (this.$store.state.accessToken) {
      const axios = require('axios')
      let config = { headers: { Authorization: this.$store.state.accessToken } }
      axios.get(this.$store.state.backEndUrl + 'account/me/', config).then(response => {
        this.$store.commit('saveAccount', response.data)
        this.isLoading = false
        this.$store.commit('setIsLoading', false)
      }).catch(error => {
        if (error.response.status === 404) {
          config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          const params = new URLSearchParams()
          params.append('grant_type', 'refresh_token')
          params.append('client_id', this.$store.state.clientId)
          params.append('client_secret', this.$store.state.clientSecret)
          params.append('refresh_token', this.$store.state.refreshToken)
          axios.post(this.$store.state.backEndUrl + 'o/token/', params, config).then(response => {
            this.$store.commit('setTokens', {
              accessToken: response.data.token_type + ' ' + response.data.access_token,
              refreshToken: response.data.refresh_token
            })
            config = { headers: { Authorization: this.$store.state.accessToken } }
            axios.get(this.$store.state.backEndUrl + 'account/me/', config).then(response => {
              this.$store.commit('saveAccount', response.data)
              this.isLoading = false
              this.$store.commit('setIsLoading', false)
            })
          }).catch(() => {
            this.isLoading = false
            this.$store.commit('setIsLoading', false)
          })
        }
      })
    } else {
      this.isLoading = false
      this.$store.commit('setIsLoading', false)
    }
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
