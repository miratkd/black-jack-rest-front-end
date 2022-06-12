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
    </div>

    <!-- Dialogs -->
    <DailyTicketDialog v-if="dailyTicket" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
import DailyTicketDialog from '@/components/DailyTicket.vue'
export default {
  name: 'MyAccount',
  data () {
    return {
      account: undefined,
      dailyTicket: false
    }
  },
  components: {
    DailyTicketDialog
  },
  methods: {
    closeDialog () {
      this.dailyTicket = false
      this.$store.state.isLoading = false
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
  min-height: 86.3vh;
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
  font-size: 25px;
  cursor: pointer;
  border: 3px solid lightsalmon;
}
.email-text{
  font-size: 20px;
}
@media only screen and (max-width: 1000px) {
  .page-containear{
    font-size: 1.5vw;
  }
}
@media only screen and (max-width: 650px) {
  .page-containear{
    font-size: 1.5vw;
  }
  .mobile-hide{
    display: none;
  }
  .daily-ticket{
    flex: 1;
    text-align: center;
  }
}
</style>
