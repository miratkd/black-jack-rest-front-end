<template>
  <div class="modal-container" v-on:click="closeDialog()">
    <div class="page-content" v-on:click.stop>
      <div class="createmath-modal-title">Você esta prestes a iniciar uma nova partida!</div>
      <div class="createmath-modal-subtitle">Insira o valor que deseja apostar. Se ganhar, ira receber o triplo do que apostou! caso contrario, ira perder tudo.</div>
      <div class="createmath-modal-input-container">
        <div class="createmath-modal-input-label">Aposta:</div>
        <input type="number" v-model="bet" class="createmath-modal-input"/>
      </div>
      <div class="createmath-modal-button" v-on:click="createMath()">Criar Partida!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateMath',
  props: ['closeDialog', 'account'],
  data () {
    return {
      bet: undefined
    }
  },
  methods: {
    createMath () {
      if (!this.bet) {
        this.$store.state.toast.error('Por favor, insira o valor que deseja apostar.')
        return
      }
      this.$store.state.isLoading = true
      const url = this.$store.state.backEndUrl + 'math/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      const data = {
        account: this.account.id,
        buy_in_value: this.bet
      }
      this.$store.state.axios.post(url, data, config).then(response => {
        localStorage.setItem('activeMath', response.data.id)
        this.$router.push('Math')
      }).catch(error => {
        if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.createMath()
          })
        }
      })
    }
  },
  mounted () { document.documentElement.style.overflow = 'hidden' },
  unmounted () { document.documentElement.style.overflow = 'auto' }
}
</script>

<style scoped>
.modal-container{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2px);
  backdrop-filter: brightness(60%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
}
.page-content{
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  z-index: 2;
  width: 80%;
  text-align: center;
}
.createmath-modal-title{
  font-size: 4em;
}
.createmath-modal-subtitle{
  margin-top: 1vh;
  font-size: 2em;
}
.createmath-modal-input-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
}
.createmath-modal-input-label{
  font-size: 2.5em;
  margin-right: 5vw;
}
.createmath-modal-input{
  border: 1px solid lightseagreen;
  border-radius: 5px;
  padding: 1vh 0.5vw 1vh 2vw;
  color: lightseagreen;
  font-size: 2em;
  width: 15vw;
}
.createmath-modal-input:focus{
  outline: none;
  outline: 2.5px solid lightseagreen;
}
.createmath-modal-button{
  margin: 5vh auto 0 auto;
  width: 20vw;
  background-color: lightseagreen;
  text-align: center;
  padding: 2vh 0;
  color: white;
  border-radius: 10px;
  font-size: 2em;
  cursor: pointer;
}
@media only screen and (max-width: 850px) {
  .modal-container{
    font-size: 1.25vw;
  }
}
@media only screen and (max-width: 800px) {
  .modal-container{ font-size: 1.5vw; }
  .createmath-modal-input{ width: 50vw; }
  .createmath-modal-button{ width: 40vw; }
}
@media only screen and (max-width: 600px) {
  .modal-container{ font-size: 2vw; }
  .page-content{ padding: 5vw; }
}
@media only screen and (max-width: 500px) { .modal-container{ font-size: 2.25vw; } }
@media only screen and (max-width: 400px) { .modal-container{ font-size: 2.5vw; } }
@media only screen and (max-width: 300px) { .modal-container{ font-size: 2.75vw; } }
@media only screen and (max-width: 200px) { .modal-container{ font-size: 3vw; } }

</style>
