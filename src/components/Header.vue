<template>
  <div class="header-containear">
    <div v-on:click="sendHome()" class="header-title">Black-Jack-Rest</div>
    <div v-if="$store.state.account" v-on:click="() => showMenu = !showMenu" class="header-title-user header-title">
      <span class="material-icons header-title-user-icon">account_circle</span>
      <div>{{$store.state.account.user.username}}</div>
    </div>
    <div v-if="showMenu" class="account-menu-containear">
        <div class="account-menu-close">
          <div>{{$store.state.account.user.email}}</div>
          <span class="material-icons account-menu-close-icon" v-on:click="() => showMenu = !showMenu">close</span>
        </div>
        <div class="account-menu-row" v-on:click="() => {$router.push('/edit'); this.showMenu = false}">
          <span class="material-icons account-menu-icon">edit</span>
          <div>Editar conta</div>
        </div>
        <div class="account-menu-row" v-on:click="cleanAccount()">
          <span class="material-icons account-menu-icon">logout</span>
          <div>Sair</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    sendHome () {
      this.$router.push('/')
    },
    cleanAccount () {
      this.sendHome()
      this.showMenu = false
      this.$store.commit('cleanAccount')
    }
  }
}
</script>

<style scoped>
  .header-containear{
    display: flex;
    align-items: center;
    background-color: lightseagreen;
    padding: 10px;
    justify-content: space-between;
    font-size: 1vw;
    min-height: 5vh;
  }
  .header-title{
    font-size: 3.1em;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
  .header-title-user{
    display: flex;
    align-items: center;
  }
  .header-title-user-icon{
    font-size: 1.3em;
    margin-right: 30px;
  }
  .account-menu-containear{
    position: absolute;
    top: 9vh;
    background-color: white;
    border: 2px solid lightsalmon;
    border-radius: 5px;
    color: lightseagreen;
    padding: 1.5vw;
    right: 2vw ;
    font-size: 2em;
  }
  .account-menu-row{
    display: flex;
    margin-top: 1.5vh;
    cursor: pointer;
  }
  .account-menu-icon{
    margin-right: 1vw;
    font-size: 1em;
  }
  .account-menu-close{
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    align-items: center;
  }
  .account-menu-close-icon{
    cursor: pointer;
    margin-left: 2vw;
    font-size: 1em;
  }
@media only screen and (max-width: 1000px) { .header-containear{ font-size: 1.5vw; } }
@media only screen and (max-width: 800px) { .header-containear{ font-size: 1.75vw; } }
@media only screen and (max-width: 650px) { .header-containear{ font-size: 2vw; } }
@media only screen and (max-width: 500px) { .header-containear{ font-size: 2.25vw; } }
@media only screen and (max-width: 300px) { .header-containear{ font-size: 2.75vw; } }
@media only screen and (max-width: 200px) { .header-containear{ font-size: 3vw; } }
</style>
