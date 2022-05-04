<template>
  <div class="page-containear">
    <div class="account-section-containear">
      <div class="account-section-line">{{this.$store.state.account.user.username}}</div>
      <div class="account-section-line">{{this.$store.state.account.user.email}}</div>
      <div class="account-section-line">Tickets: {{this.$store.state.account.tickets}}</div>
    </div>
    <div class="actions-section-containear">
      <div class="tickets-section-containear">
        <div class="daily-ticket">Resgatar ticket diario!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      account: undefined
    }
  },
  mounted () {
    this.account = this.$store.state.account
  }
}
</script>

<style scoped>
.page-containear{
  display: flex;
  min-height: 86.3vh;
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
  font-size: 25px;
  padding: 30px 0;
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
</style>
