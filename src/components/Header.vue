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
  }
  .header-title{
    font-size: 40px;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
  .header-title-user{
    display: flex;
    align-items: center;
  }
  .header-title-user-icon{
    font-size: 40px;
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
    font-size: 25px;
  }
  .account-menu-row{
    display: flex;
    margin-top: 1.5vh;
    cursor: pointer;
  }
  .account-menu-icon{
    margin-right: 1vw;
  }
  .account-menu-close{
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    align-items: center;
  }
  .account-menu-close-icon{
    cursor: pointer;
    margin-left: 1.5vw;
    font-size: 35px;
  }
</style>
