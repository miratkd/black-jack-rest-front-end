<template>
  <div class="math-page" v-if="!$store.state.isLoading">
    <div class="math-page-header">
      <div class="math-page-header-button">Premio: {{math.prize}} tickets!</div>
      <div class="math-page-header-button">Round: {{math.math_active_round}}</div>
    </div>
    <div class="math-page-body">
      <div class="math-mobile-flex">
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
            <div v-if="math.dealer_hand.cards" class="math-page-body-table-cards-row-container">
              <CardLoader class="math-page-body-table-cards-img" v-for="(card, idx) in math.dealer_hand.cards" :key="idx" :card="card"/>
            </div>
            <div v-else class="math-page-body-table-cards-row-container">
              <CardLoader class="math-page-body-table-cards-img" v-for="(card, idx) in math.dealer_hand" :key="idx" :card="card"/>
            </div>
            <div v-if="math.dealer_hand.cards" class="math-page-body-table-cards-row-title" :style="specialColors(math.dealer_hand.total_point)">{{math.dealer_hand.total_point}}</div>
          </div>
          <div class="math-page-body-table-cards-row">
            <div class="math-page-body-table-cards-row-title">{{formatName($store.state.account.user.username)}}:</div>
            <div class="math-page-body-table-cards-row-container">
              <CardLoader class="math-page-body-table-cards-img" v-for="(card, idx) in math.player_hand.cards" :key="idx" :card="card"/>
            </div>
            <div class="math-page-body-table-cards-row-title" :style="specialColors(math.player_hand.total_point)">{{math.player_hand.total_point}}</div>
          </div>
        </div>
        <div class="math-page-body-table-buttons">
          <div class="math-page-body-table-button" :class="disabledDraw()" v-on:click="drawCard()">Sacar carta</div>
          <div class="math-page-body-table-button" :class="disabledHold()" v-on:click="hold()">Manter mao</div>
          <div class="math-page-body-table-button" :class="disabledNextRound()" v-on:click="nextRound()">Proximo round</div>
        </div>
      </div>
    </div>
    <MathResult v-if="mathIsOver" :isWin="isWin" :prize="math.prize" />
  </div>
</template>

<script>
import CardLoader from '@/components/CardLoader.vue'
import MathResult from '@/components/MathResult.vue'
export default {
  name: 'Math',
  components: {
    CardLoader,
    MathResult
  },
  data () {
    return {
      math: {},
      mathIsOver: false,
      isWin: undefined
    }
  },
  methods: {
    disabledDraw () {
      if (this.math.dealer_hand.cards || this.math.player_hand.total_point > 21) return 'disabledButton'
    },
    disabledHold () {
      if (this.math.dealer_hand.cards || this.math.player_hand.total_point > 21) return 'disabledButton'
    },
    disabledNextRound () {
      if (!this.math.dealer_hand.cards && this.math.player_hand.total_point <= 21) return 'disabledButton'
    },
    hold () {
      if (this.math.dealer_hand.cards || this.math.player_hand.total_point > 21) return
      this.$store.state.isLoading = true
      const url = this.$store.state.backEndUrl + 'math/' + localStorage.getItem('activeMath') + '/hold/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      const data = {}
      this.$store.state.axios.put(url, data, config).then(response => {
        this.math = response.data.math
        if (response.data.message === 'Congratulations, you won this round!') this.$store.state.toast.success('Parabens! você ganhou esse round.')
        else this.$store.state.toast.error('Desculpe! você perdeu esse round.')
        this.$store.state.isLoading = false
      })
    },
    nextRound () {
      if (!this.math.dealer_hand.cards && this.math.player_hand.total_point <= 21) return
      this.$store.state.isLoading = true
      const url = this.$store.state.backEndUrl + 'math/' + localStorage.getItem('activeMath') + '/next_round/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      const data = {}
      this.$store.state.axios.put(url, data, config).then(response => {
        if (response.data.math_is_over) {
          this.mathIsOver = true
          if (response.data.message === 'Sorry, you lose the math.') this.isWin = false
          else this.isWin = true
          this.math = response.data.math
          this.$store.state.isLoading = false
        } else {
          this.math = response.data
          this.$store.state.isLoading = false
        }
      }).catch(error => {
        if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.nextRound()
          })
        }
      })
    },
    drawCard () {
      if (this.math.dealer_hand.cards || this.math.player_hand.total_point > 21) return
      this.$store.state.isLoading = true
      const url = this.$store.state.backEndUrl + 'math/' + localStorage.getItem('activeMath') + '/draw_card/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      const data = {}
      this.$store.state.axios.put(url, data, config).then(response => {
        this.math = response.data
        if (response.data.player_hand.total_point > 21) this.$store.state.toast.error('Desculpe, você estourou.')
        this.$store.state.isLoading = false
      }).catch(error => {
        if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.drawCard()
          })
        } else if (error.response.status === 400 && error.response.data.message === 'You can not draw another card, this round is over.') {
          this.$store.state.toast.error('Você não pode sacar outra carta, esse round já terminou.')
          this.$store.state.isLoading = false
        }
      })
    },
    specialColors (value) {
      if (value > 21) return 'color: red'
      else if (value === 21) return 'color: yellow'
    },
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
    getHouseRounds (math) {
      if (math.dealer_hand.cards) return math.math_active_round - math.rounds_won
      return math.math_active_round - 1 - math.rounds_won
    }
  },
  created () {
    this.$store.state.isLoading = true
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
.disabledButton{
  cursor: default;
  background-color: lightgray;
  border: 2px solid gray;
}
@media only screen and (max-width: 700px) {
  .math-page-header{
    flex-direction: column;
    gap: 2vh;
  }
  .math-page-header-button{width: 100%; padding: 2vw 0;}
  .math-page-body{flex-direction: column;}
  .math-mobile-flex{
    display: flex;
    justify-content: space-between;
  }
  .math-page-body-back{
    margin-top: 0;
    padding: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    font-size: 3.5em;
  }
  .math-page-body-score-container{
    width: 45%;
    padding: 1vh 0;
  }
  .math-page-body-table{
    margin-left: 0;
    margin-top: 2vh;
  }
  .math-page{
    font-size: 1.5vw;
  }
  .math-page-body-table-button{font-size: 2em;}
}
@media only screen and (max-width: 450px) {
  .math-page-body-table-button{padding: 2vh 1vw; border: 1px solid lightsalmon;}
  .math-page-header-button{padding: 3vh 0; border: 1px solid lightsalmon;}
  .math-page{padding: 2vh 2vw; font-size: 2.5vw;}
  .math-page-body-table-cards-row-title{
    font-size: 3em;
  }
  .math-page-body-back{border: 1px solid lightsalmon;}
  .math-page-body-score-container{border: 1px solid lightsalmon;}
  .math-page-body-table{flex-direction: column;}
  .math-page-body-table-cards{
    width: 100%;
    gap: 2vh;
    margin: 1.5vh 0;
  }
  .math-page-body-table-buttons{
    gap: 2vh;
    padding: 0 4vw;
    margin-bottom: 4vh;
  }
}

</style>
