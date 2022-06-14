<template>
  <div class="modal-container" v-on:click="closeDialog()">
    <div class="page-content" v-on:click.stop>
      <div class="content-title">Resgate seus tickets diarios!</div>
      <div class="content-subtitle">Uma vez por dia, você pode resgatar uma quantidade gratuita de tickets, clique no botão abaixo e os tickets serão automaticamente adicionados a sua conta!</div>
      <div class="content-button-containear">
        <div v-on:click="submitFreeTicket()" class="content-button">Resgatar tickets</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'DailyTicketDialog',
  props: ['closeDialog'],
  data () {
    return {
      toast: useToast()
    }
  },
  methods: {
    submitFreeTicket () {
      this.$store.state.isLoading = true
      const url = this.$store.state.backEndUrl + 'account/redeem_daily_tickets/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      const data = {}
      this.$store.state.axios.put(url, data, config).then(response => {
        this.$store.commit('saveAccount', response.data.account)
        this.closeDialog()
        this.toast.success('Tickets resgatados com sucesso')
      }).catch(error => {
        if (error.response.data === 'have you redeemed your daily tickets today.') {
          this.toast.error('Desculpe, você ja resgatou o seu ticket hoje')
        } else if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.submitFreeTicket()
          })
        } else {
          this.toast.error('Não foi possivel resgatar o ticket')
        }
        this.closeDialog()
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
}
.content-title{
  font-size: 4em;
  text-align: center;
}
.content-subtitle{
  max-width: 80vw;
  margin-top: 1vh;
  font-size: 2em;
}
.content-button-containear{
  display: flex;
  justify-content: center;
  margin-top: 2vh;
}
.content-button{
  color: white;
  background-color: lightseagreen;
  border-radius: 10px;
  width: 50%;
  align-self: center;
  padding: 1vh 0;
  text-align: center;
  font-size: 3em;
  cursor: pointer;
  border: 3px solid lightsalmon;
}
@media only screen and (max-width: 750px) {
  .modal-container{
    font-size: 1.5vw;
  }
  .page-content{
    padding: 5vw;
    max-width: 80vw;
  }
}
@media only screen and (max-width: 500px) {
  .modal-container{
    font-size: 2vw;
  }
}
</style>
