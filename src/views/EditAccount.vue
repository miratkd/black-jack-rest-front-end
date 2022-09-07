<template>
  <div class="edit-account">
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
        Atualizar conta!
      </div>
      <span class="material-icons edit-account-form-delete-button" v-on:click="deleteAccount()">delete</span>
    </div>

    <DeleteAccountModal :close="closeDeleteAccount" v-if="showDeleteAccount"/>
  </div>
</template>

<script>
import DeleteAccountModal from '@/components/DeleteAccountModal.vue'
export default {
  name: 'EditAccount',
  components: { DeleteAccountModal },
  data () {
    return {
      firstName: this.$store.state.account.user.first_name,
      secondName: this.$store.state.account.user.last_name,
      email: this.$store.state.account.user.email,
      emailErrorMessage: undefined,
      showDeleteAccount: false
    }
  },
  methods: {
    closeDeleteAccount () { this.showDeleteAccount = false },
    deleteAccount () { this.showDeleteAccount = true },
    getErrorClass () {
      if (this.emailErrorMessage) {
        return 'page-input-error'
      }
    },
    sendHome () { this.$router.push('/eu') },
    editAccount () {
      this.$store.commit('setIsLoading', true)
      const config = { headers: { Authorization: this.$store.state.accessToken } }
      this.$store.state.axios.put(this.$store.state.backEndUrl + 'account/' + this.$store.state.account.id + '/', {
        user: {
          first_name: this.firstName,
          last_name: this.secondName,
          email: this.email
        }
      }, config).then(() => {
        this.$store.state.axios.get(this.$store.state.backEndUrl + 'account/me/', config).then(response => {
          this.$store.commit('saveAccount', response.data)
          this.$store.commit('setIsLoading', false)
          this.sendHome()
        })
      }).catch(error => {
        if (error.response.status === 401 && error.response.data === 'you need a token for this endpoint') {
          this.$store.dispatch('refreshToken').then(() => {
            this.editAccount()
          })
        } else if (error.response.data.user.email) {
          this.emailErrorMessage = error.response.data.user.email[0]
          this.$store.commit('setIsLoading', false)
        } else {
          this.$store.state.toast.error('Desculpe, não foi possivel atualizar a conta')
          this.$store.commit('setIsLoading', false)
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-account{font-size: 1vw;}
.page-title{
  padding-top: 7vh;
  text-align: center;
  font-size: 3em;
  font-weight: 700;
}
.page-input-row{
  display: flex;
  align-items: center;
  margin-top: 5vh;
  font-size: 2em;
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
  font-size: 1em;
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
    align-items: center;
    margin-top: 10vh;
    margin-bottom: 5vh;
  }
  .edit-account-form-cancel-button{
    border: 2px solid lightcoral;
    color: lightcoral;
    width: 20vw;
    padding: 3vh 0;
    text-align: center;
    border-radius: 10px;
    font-size: 2.2em;
    cursor: pointer;
  }
  .edit-account-form-create-button{
    border: 2px solid lightseagreen;
    width: 20vw;
    padding: 3vh 0;
    text-align: center;
    border-radius: 10px;
    font-size: 2.2em;
    cursor: pointer;
    margin-left: 10vw;
  }
  .page-email-error-message{
    font-size: 1.5em;
    color: lightcoral;
    text-align: center;
    margin-top: 0.5vh;
  }
  .edit-account-form-delete-button{
    color: gray;
    cursor: pointer;
    font-size: 4em;
    margin-left: 4vw;
  }
  .edit-account-form-delete-button:hover{
    color: lightcoral;
  }
  @media only screen and (max-width: 700px) {
    .edit-account-form-buttons-containear{
      flex-direction: column;
      align-items: center;
    }
    .edit-account-form-create-button{
      margin-left: 0;
      margin-top: 2vh;
      width: 70vw;
    }
    .edit-account-form-cancel-button{
      width: 70vw;
    }
  }
</style>
