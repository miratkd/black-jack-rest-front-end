<template>
  <div class="page-containear" v-if="account">
    <div class="account-section-containear mobile-hide">
      <div class="account-section-line">{{$store.state.account.user.username}}</div>
      <div v-if="$store.state.account.user.first_name && $store.state.account.user.last_name" class="account-section-line">
        {{$store.state.account.user.first_name + ' ' + $store.state.account.user.last_name}}
      </div>
      <div class="account-section-line email-text">{{$store.state.account.user.email}}</div>
      <div class="account-section-line">Tickets: {{$store.state.account.tickets}}</div>
    </div>
    <div class="actions-section-containear">
      <div class="tickets-section-containear">
        <div class="daily-ticket" v-on:click="() => dailyTicket = true">Resgatar ticket diario!</div>
      </div>
      <div class="game-buttons-container">
        <div class="game-button" v-on:click="() => createMathDialog = true">Novo jogo</div>
        <div class="game-button" v-on:click="openMath()">Retornar ao jogo</div>
      </div>
    </div>

    <!-- Dialogs -->
    <DailyTicketDialog v-if="dailyTicket" :closeDialog="closeDialog"/>
    <CreateMathDialog v-if="createMathDialog" :account="account" :closeDialog="closeCreateMathDialog"/>
  </div>
</template>

<script>
import DailyTicketDialog from '@/components/DailyTicket.vue'
import CreateMathDialog from '@/components/CreateMath.vue'
export default {
  name: 'MyAccount',
  data () {
    return {
      account: undefined,
      dailyTicket: false,
      createMathDialog: false
    }
  },
  components: {
    DailyTicketDialog,
    CreateMathDialog
  },
  methods: {
    openMath () {
      if (localStorage.getItem('activeMath')) {
        this.$store.state.isLoading = true
        this.$router.push('Math')
      } else {
        this.$store.state.toast.error('Desculpe, você não tem uma partida em andamento.')
      }
    },
    closeDialog () {
      this.dailyTicket = false
      this.$store.state.isLoading = false
    },
    closeCreateMathDialog () {
      this.createMathDialog = false
    }
  },
  beforeMount () {
    if (this.$store.state.account) this.account = this.$store.state.account
    else this.$router.push('/')
  }
}
</script>

<style scoped>
.page-containear{
  display: flex;
  min-height: inherit;
  font-size: 1vw;
}
.account-section-containear{
  background-color: lightseagreen;
  margin: 30px;
  width: 20vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 2.5em;
  padding: 30px 0.5em;
  min-width: fit-content;
}
.account-section-line{
  margin-bottom: 30px;
}
.tickets-section-containear{
  display: flex;
  justify-content: flex-end;
}
.actions-section-containear{
  flex: 1;
  margin: 30px;
}
.daily-ticket{
  background-color: lightseagreen;
  color: white;
  padding: 25px;
  border-radius: 10px;
  font-size: 2em;
  cursor: pointer;
  border: 3px solid lightsalmon;
}
.email-text{
  font-size: 0.8em;
}
.game-buttons-container{
  display: flex;
  justify-content: space-between;
  margin-top: 20vh;
}
.game-button{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightseagreen;
  color: white;
  border-radius: 10px;
  font-size: 2.5em;
  cursor: pointer;
  border: 3px solid lightsalmon;
  height: 25vh;
  width: 25vw;
}
@media only screen and (max-width: 1000px) {
  .page-containear{
    font-size: 1.5vw;
  }
}
@media only screen and (max-width: 800px) {
  .mobile-hide{
    display: none;
  }
  .daily-ticket{
    flex: 1;
    text-align: center;
  }
  .game-buttons-container{
    flex-direction: column;
    margin-top: 5vh;
  }
  .game-button{
    width: 100%;
    height: 10vh;
    margin-bottom: 3vh;
  }
}
@media only screen and (max-width: 500px) { .page-containear{ font-size: 2.25vw; } }
@media only screen and (max-width: 400px) { .page-containear{ font-size: 2.5vw; } }
@media only screen and (max-width: 300px) { .page-containear{ font-size: 2.75vw; } }
@media only screen and (max-width: 200px) { .page-containear{ font-size: 3vw; } }
</style>
