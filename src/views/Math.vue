<template>
  <div>test</div>
</template>

<script>
export default {
  name: 'Math',
  data () {
    return {
      math: {}
    }
  },
  methods: {
    getMath () {
      const url = this.$store.state.backEndUrl + 'math/' + localStorage.getItem('activeMath') + '/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      this.$store.state.axios.get(url, config).then(response => {
        this.math = response.data
        this.$store.state.isLoading = false
      }).catch(error => {
        if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.getMath()
          })
        }
      })
    }
  },
  mounted () {
    if (!localStorage.getItem('activeMath')) this.$router.push('MyAccount')
    this.getMath()
  }
}
</script>

<style scoped>

</style>
