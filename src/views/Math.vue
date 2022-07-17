<template>
  <div class="math-page" v-if="!$store.state.isLoading">
    <div class="math-page-header">
      <div class="math-page-header-button">Premio: {{math.prize}} tickets!</div>
      <div class="math-page-header-button">Round: {{math.math_active_round}}</div>
    </div>
    <div class="math-page-body">
      <div>
        <div class="math-page-body-score-container">
          <div>
            <div :title="$store.state.account.user.username" class="math-page-body-score-text math-page-body-score-name">{{formatName($store.state.account.user.username)}}</div>
            <div class="math-page-body-score-text math-page-body-score-value">{{math.rounds_won}}</div>
          </div>
          <div>
            <div class="math-page-body-score-text math-page-body-score-name">Casa</div>
            <div class="math-page-body-score-text math-page-body-score-value">{{getHouseRounds(math)}}</div>
          </div>
        </div>
        <div class="math-page-body-back">Voltar</div>
      </div>
      <div class="math-page-body-table">
        <div class="math-page-body-table-cards">
          <div class="math-page-body-table-cards-row">
            <div class="math-page-body-table-cards-row-title">casa:</div>
            <div class="math-page-body-table-cards-row-container">
              <CardLoader class="math-page-body-table-cards-img" v-for="(card, idx) in math.dealer_hand" :key="idx" :card="card"/>
            </div>
          </div>
          <div class="math-page-body-table-cards-row">
            <div class="math-page-body-table-cards-row-title">{{formatName($store.state.account.user.username)}}:</div>
            <div class="math-page-body-table-cards-row-container">
              <CardLoader class="math-page-body-table-cards-img" v-for="(card, idx) in math.player_hand.cards" :key="idx" :card="card"/>
            </div>
          </div>
        </div>
        <div class="math-page-body-table-buttons">
          <div class="math-page-body-table-button">Sacar carta</div>
          <div class="math-page-body-table-button">Manter mao</div>
          <div class="math-page-body-table-button">Proximo round</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardLoader from '@/components/CardLoader.vue'
export default {
  name: 'Math',
  components: {
    CardLoader
  },
  data () {
    return {
      math: {}
    }
  },
  methods: {
    formatName (name) {
      if (name.length > 9) return name.slice(0, 9) + '...'
      return name
    },
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
  font-size: 2.2em;
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
.math-page-body-score-value{font-size: 2em;}
.math-page-body-back{
  background-color: lightseagreen;
  color: white;
  padding: 2vw 0;
  border-radius: 10px;
  font-size: 2.5em;
  border: 3px solid lightsalmon;
  text-align: center;
  width: 50%;
  cursor: pointer;
  margin-top: 3vh;
}
.math-page-body-table{
  background-color: lightgray;
  min-height: 55vh;
  flex: 1;
  margin-left: 4vw;
  display: flex;
  border-radius: 10px;
}
.math-page-body-table-cards{
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.math-page-body-table-buttons{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 1.5vw;
}
.math-page-body-table-button{
  background-color: lightseagreen;
  color: white;
  padding: 2vw 0;
  border-radius: 10px;
  font-size: 1.5em;
  border: 3px solid lightsalmon;
  text-align: center;
  cursor: pointer;
}
.math-page-body-table-cards-row{
  display: flex;
  align-items: center;
  margin-right: 2vw;
}
.math-page-body-table-cards-row-title{
  font-size: 2.5em;
  margin-left: 2vw;
}
.math-page-body-table-cards-row-container{
  display: flex;
  flex: 1;
  overflow-x: auto;
}
.math-page-body-table-cards-img{
  height: 20vh;
  margin-left: 2vw;
}
</style>
