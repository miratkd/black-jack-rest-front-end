<template>
  <div class="create-account">
    <div class="create-account-title">
      Crie a sua conta.
    </div>
    <div class="row">
      <div class="create-account-form-colum">
        <div class="create-account-form-text" :class="haveErrorInput(userNameError)">
          Nome de usuario:
        </div>
        <input v-model="userName" class="create-account-form-input" :class="haveErrorInputBorder(userNameError)" type="text">
        <div v-if="userNameError" class="error-color" style="margin-top: 1vh">
          {{userNameError}}
        </div>
      </div>
      <div class="create-account-form-colum create-account-form-second-colum">
        <div class="create-account-form-text" :class="haveErrorInput(emailError)">
          Email:
        </div>
        <input v-model="email" class="create-account-form-input" :class="haveErrorInputBorder(emailError)" type="text">
        <div v-if="emailError" class="error-color" style="margin-top: 1vh">
          {{emailError}}
        </div>
      </div>
    </div>
    <div class="row  create-account-form-second-line">
      <div class="create-account-form-colum">
        <div class="create-account-form-text" :class="haveErrorInput(passwordError)">
          Senha:
        </div>
        <input v-model="password" :class="haveErrorInputBorder(passwordError)" class="create-account-form-input" type="password">
        <div v-if="passwordError" class="error-color" style="margin-top: 1vh">
          {{passwordError}}
        </div>
      </div>
      <div class="create-account-form-colum create-account-form-second-colum">
        <div class="create-account-form-text" :class="haveErrorInput(confirmPasswordError)">
          Confirme a senha:
        </div>
        <input v-model="secondPassword" :class="haveErrorInputBorder(confirmPasswordError)" class="create-account-form-input" type="password">
        <div v-if="confirmPasswordError" class="error-color" style="margin-top: 1vh">
          {{confirmPasswordError}}
        </div>
      </div>
    </div>
    <div class="create-account-form-buttons-containear">
      <div v-on:click="sendHome()" class="create-account-form-cancel-button">
        Voltar.
      </div>
      <div v-on:click="createAccount()" class="create-account-form-create-button">
        Criar conta!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAccount',
  data () {
    return {
      userName: '',
      email: '',
      password: '',
      secondPassword: '',
      userNameError: undefined,
      emailError: undefined,
      passwordError: undefined,
      confirmPasswordError: undefined
    }
  },
  methods: {
    sendHome () {
      this.$router.push('/')
    },
    haveErrorInput (input) {
      if (input) return 'error-color'
    },
    haveErrorInputBorder (input) {
      if (input) return 'error-border'
    },
    createAccount () {
      if (this.password !== this.secondPassword) {
        this.confirmPasswordError = 'As senhas estão diferentes'
        return false
      }
      this.$store.commit('setIsLoading', true)
      this.$store.state.axios.post(this.$store.state.backEndUrl + 'account/', {
        user: {
          username: this.userName,
          email: this.email,
          password: this.password
        }
      }).then(response => {
        this.$store.state.toast.success('Conta criada com sucesso!')
        this.$store.commit('saveAccount', response.data)
        this.$store.dispatch('login', { userName: this.userName, password: this.password }).then(() => {
          this.$router.push('/eu')
          this.$store.commit('setIsLoading', false)
        })
      }).catch(error => {
        if (error.response.data.user.username) {
          this.userNameError = error.response.data.user.username[0]
        }
        if (error.response.data.user.password) {
          this.passwordError = error.response.data.user.password[0]
        }
        if (error.response.data.user.email) {
          this.emailError = error.response.data.user.email[0]
        }
        this.$store.commit('setIsLoading', false)
      })
    }
  },
  mounted () {
    if (this.$store.state.account) this.$router.push('/eu')
  }
}
</script>

<style scoped>
  .create-account{font-size: 1.3vw;}
  .create-account-title{
    text-align: center;
    font-size: 3em;
    padding-top: 5vh;
  }
  .row{
    display: flex;
    justify-content: space-around;
  }
  .create-account-form-text{
    font-size: 2.5em;
  }
  .create-account-form-input{
    margin-top: 2vh;
    border: none;
    border: 2px solid lightseagreen;
    border-radius: 5px;
    font-size: 2em;
    padding: 1vw;
    color: lightseagreen;
    width: 100%;
  }
  .create-account-form-input:focus{
    outline: none;
  }
  .create-account-form-second-colum{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .create-account-form-second-line{
    margin-top: 3vh;
  }
  .create-account-form-colum{
    width: 30vw;
  }
  .create-account-form-buttons-containear{
    display: flex;
    justify-content: center;
    margin-top: 10vh;
    margin-bottom: 5vh;
  }
  .create-account-form-cancel-button{
    border: 1px solid lightcoral;
    color: lightcoral;
    width: 20vw;
    padding: 2vh 0;
    text-align: center;
    border-radius: 10px;
    font-size: 2.5em;
    cursor: pointer;
  }
  .create-account-form-create-button{
    border: 1px solid lightseagreen;
    width: 20vw;
    padding: 2vh 0;
    text-align: center;
    border-radius: 10px;
    font-size: 2.5em;
    cursor: pointer;
    margin-left: 10vw;
  }
  @media only screen and (max-width: 1200px) {
    .create-account{font-size: 2vw;}
    .create-account-form-cancel-button{width: 35vw;}
    .create-account-form-create-button{width: 35vw;}
    .row{
      flex-direction: column;
      align-items: center;
    }
    .create-account-form-colum{
      width: 80vw;
    }
    .create-account-form-input{
      padding: 15px 5%;
      width: 90%;
    }
    .create-account-form-text{
      text-align: center;
    }
    .create-account-form-second-colum{
      align-items: center;
      margin-top: 30px;
    }
    .create-account-title{
      margin-bottom: 50px;
    }
    .create-account-form-buttons-containear{
      margin-top: 50px;
    }
  }
  .error-color{
    color: lightcoral;
  }
  .error-border{
    border: 1px solid lightcoral;
    color: lightcoral;
  }
  @media only screen and (max-width: 1060px) {
    .create-account-form-create-button{
      width: 30vw;
    }
    .create-account-form-cancel-button{
      width: 30vw;
    }
  }
  @media only screen and (max-width: 730px) {
    .create-account-form-buttons-containear{
      flex-direction: column;
      align-items: center;
    }
    .create-account-form-cancel-button{
      width: 70vw;
      padding: 15px 0;
    }
    .create-account-form-create-button{
      width: 70vw;
      margin-left: 0;
      margin-top: 20px;
      margin: 20px 0 100px 0;
      padding: 15px 0;
    }
  }
  @media only screen and (max-width: 550px) {
    .create-account{font-size: 3vw;}
  }
</style>
