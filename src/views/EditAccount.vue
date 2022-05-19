<template>
  <div>
    <div class="page-title">Edite sua conta.</div>
    <div class="page-input-row">
      <div class="page-input-text">Primeiro nome:</div>
      <div class="page-input-containear">
        <input v-model="firstName" class="page-input" type="text">
      </div>
    </div>
    <div class="page-input-row">
      <div class="page-input-text">Segundo nome:</div>
      <div class="page-input-containear">
        <input v-model="secondName" class="page-input" type="text">
      </div>
    </div>
    <div class="page-input-row">
      <div class="page-input-text">Email:</div>
      <div class="page-input-containear">
        <input v-model="email" class="page-input" :class="getErrorClass()" type="text">
      </div>
    </div>
    <div class="page-email-error-message" v-if="emailErrorMessage">
      {{emailErrorMessage}}
    </div>
    <div class="edit-account-form-buttons-containear">
      <div v-on:click="sendHome()" class="edit-account-form-cancel-button">
        Voltar.
      </div>
      <div v-on:click="editAccount()" class="edit-account-form-create-button">
        Criar conta!
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'EditAccount',
  data () {
    return {
      firstName: this.$store.state.account.user.first_name,
      secondName: this.$store.state.account.user.last_name,
      email: this.$store.state.account.user.email,
      emailErrorMessage: undefined,
      axios: require('axios'),
      toast: useToast()
    }
  },
  methods: {
    getErrorClass () {
      if (this.emailErrorMessage) {
        return 'page-input-error'
      }
    },
    sendHome () { this.$router.push('/eu') },
    editAccount () {
      this.$store.commit('setIsLoading', true)
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      this.axios.put(this.$store.state.backEndUrl + 'account/' + this.$store.state.account.id + '/', {
        user: {
          first_name: this.firstName,
          last_name: this.secondName,
          email: this.email
        }
      }, config).then(() => {
        this.axios.get(this.$store.state.backEndUrl + 'account/me/', config).then(response => {
          this.$store.commit('saveAccount', response.data)
          this.$store.commit('setIsLoading', false)
          this.sendHome()
        })
      }).catch(error => {
        if (error.response.data.user.email) this.emailErrorMessage = error.response.data.user.email[0]
        else this.toast.error('Desculpe, não foi possivel atualizar a conta')
        this.$store.commit('setIsLoading', false)
      })
    }
  }
}
</script>

<style scoped>
.page-title{
  padding-top: 10vh;
  text-align: center;
  font-size: 55px;
  font-weight: 700;
}
.page-input-row{
  display: flex;
  align-items: center;
  margin-top: 5vh;
  font-size: 35px;
}
.page-input-text{
  flex: 1;
  text-align: center;
}
.page-input-containear{
  flex: 1;
}
.page-input{
  width: 80%;
  font-size: 30px;
  border: 2px solid lightseagreen;
  border-radius: 5px;
  padding: 1vw;
  color: lightseagreen;
}
.page-input-error{
  border: 2px solid lightcoral;
  color: lightcoral;
}
.page-input:focus{
  outline: none;
}
.edit-account-form-buttons-containear{
    display: flex;
    justify-content: center;
    margin-top: 150px;
    margin-bottom: 50px;
  }
  .edit-account-form-cancel-button{
    border: 1px solid lightcoral;
    color: lightcoral;
    width: 20vw;
    padding: 20px 0;
    text-align: center;
    border-radius: 10px;
    font-size: 40px;
    cursor: pointer;
  }
  .edit-account-form-create-button{
    border: 1px solid lightseagreen;
    width: 20vw;
    padding: 20px 0;
    text-align: center;
    border-radius: 10px;
    font-size: 40px;
    cursor: pointer;
    margin-left: 10vw;
  }
  .page-email-error-message{
    font-size: 20px;
    color: lightcoral;
    text-align: center;
    margin-top: 0.5vh;
  }
</style>
