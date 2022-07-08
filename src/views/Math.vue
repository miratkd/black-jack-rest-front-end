<template>
  <div class="math-page">
    <div class="math-page-header">
      <div class="math-page-header-button">Premio: {{math.prize}} tickets!</div>
      <div class="math-page-header-button">Round: {{math.math_active_round}}</div>
    </div>
    <div class="math-page-body">
      <div class="math-page-body-score-container">
        <div>
          <div class="math-page-body-score-text math-page-body-score-name">{{$store.state.account.user.username}}</div>
          <div class="math-page-body-score-text">{{math.rounds_won}}</div>
        </div>
        <div>
          <div class="math-page-body-score-text math-page-body-score-name">Casa</div>
          <div class="math-page-body-score-text">{{getHouseRounds(math)}}</div>
        </div>
      </div>
      <div>test</div>
    </div>
  </div>
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
    },
    getHouseRounds (math) { return math.math_active_round - 1 - math.rounds_won }
  },
  mounted () {
    if (!localStorage.getItem('activeMath')) this.$router.push('MyAccount')
    this.getMath()
  }
}
</script>

<style scoped>
.math-page{
  padding: 5vh 5vw;
  font-size: 1vw;
}
.math-page-header{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.math-page-header-button{
  background-color: lightseagreen;
  color: white;
  padding: 2vw;
  border-radius: 10px;
  font-size: 2.5em;
  border: 3px solid lightsalmon;
  text-align: center;
  width: 25vw;
}
.math-page-body{
  display: flex;
  margin-top: 3vh;
}
.math-page-body-score-container{
  background-color: lightseagreen;
  color: white;
  padding: 2vw;
  border-radius: 10px;
  font-size: 2.5em;
  border: 3px solid lightsalmon;
  width: 25vw;
  display: flex;
  justify-content: space-around;
}
.math-page-body-score-text{
  text-align: center;
  text-transform: uppercase;
}
.math-page-body-score-name{border-bottom: 2px solid white;}
</style>
