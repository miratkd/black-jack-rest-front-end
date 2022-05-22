<template>
  <div class="page-containear" v-on:click="close()">
    <div class="page-content" v-on:click.stop>
      <div class="page-close-containear"><span v-on:click="close()" class="material-icons page-close-button">cancel</span></div>
      <div class="content-title">Excluir conta.</div>
      <div class="content-subtitle">Depois de excluir a conta não sera possivel recuperar a mesma. Todos o tickets e partidas serão perdidos. Tem certza que deseja excluir a conta?</div>
      <div v-on:click="deleteAccount()" class="delete-button">Sim, quero excluir minha conta.</div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'DeleteAccountModal',
  props: ['close'],
  data () {
    return {
      toast: useToast()
    }
  },
  methods: {
    deleteAccount () {
      this.$store.state.isLoading = true
      const axios = require('axios')
      const url = this.$store.state.localBackEndUrl + 'account/' + this.$store.state.account.id + '/'
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      axios.delete(url, config).then(() => {
        this.toast.success('Conta excluida com sucesso.')
        this.$store.commit('cleanAccount')
        this.$router.push('/')
        this.$store.state.isLoading = false
      }).catch(() => {
        this.toast.error('Desculpe, não foi possivel excluir a conta.')
        this.$store.state.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.page-containear{
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2px);
  backdrop-filter: brightness(60%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-content{
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}
.content-title{
  font-size: 40px;
  text-align: center;
}
.content-subtitle{
  max-width: 35vw;
  margin-top: 1vh;
  font-size: 20px;
  margin-top: 5vh;
}
.page-close-containear{
  display: flex;
  justify-content: flex-end;
}
.page-close-button{
  cursor: pointer;
  font-size: 40px;
}
.delete-button{
  margin: 2vh auto 0 auto;
  border: 2px solid lightcoral;
  border-radius: 5px;
  color: lightcoral;
  width: 50%;
  padding: 1vh;
  cursor: pointer;
}
.delete-button:hover{
  background-color: lightcoral;
  color: white;
}
</style>
