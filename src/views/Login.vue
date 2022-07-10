<template>
  <div class="login-page-containear">
    <div class="login-page-title">Por favor, entre com as suas credenciais:</div>
    <div class="login-page-user-line">
      <div class="login-page-input-label">Usuario:</div>
      <input v-model="userName" class="login-page-input" :class="getErrorInput()" type="text">
    </div>
    <div class="login-page-user-line">
      <div class="login-page-input-label">Senha:</div>
      <input v-model="password" class="login-page-input" :class="getErrorInput()" type="password">
    </div>
    <div class="create-account-form-buttons-containear">
      <div v-on:click="sendHome()" class="create-account-form-cancel-button">
        Voltar.
      </div>
      <div v-on:click="login()" class="create-account-form-create-button">
        Login
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: undefined,
      password: undefined,
      haveError: false
    }
  },
  methods: {
    sendHome () { this.$router.push('/') },
    login () {
      this.$store.commit('setIsLoading', true)
      this.$store.dispatch('login', { userName: this.userName, password: this.password }).then(result => {
        if (result.success) {
          this.$router.push('/eu')
        } else {
          this.$store.state.toast.error(result.message)
          this.haveError = true
        }
        this.$store.commit('setIsLoading', false)
      })
    },
    getErrorInput () {
      if (this.haveError) return 'login-page-input-error'
    }
  }
}
</script>

<style scoped>
.login-page-containear{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-page-title{
  margin-top: 150px;
  font-size: 40px;
  font-weight: 700;
  padding: 0 25px;
  text-align: center;
}
.login-page-user-line{
  display: flex;
  margin-top: 50px;
  font-size: 50px;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}
.login-page-input{
  padding: 15px 5%;
  border: 2px solid lightseagreen;
  border-radius: 5px;
  width: 70%;
  font-size: 35px;
  color: lightseagreen;
  outline: lightseagreen;
}
.login-page-input-error{
  border: 2px solid lightcoral;
  color: lightcoral;
}
.create-account-form-buttons-containear{
  display: flex;
  justify-content: center;
  margin-top: 150px;
  margin-bottom: 50px;
}
.create-account-form-cancel-button{
  border: 1px solid lightcoral;
  color: lightcoral;
  width: 20vw;
  padding: 20px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 40px;
  cursor: pointer;
}
.create-account-form-create-button{
  border: 1px solid lightseagreen;
  width: 20vw;
  padding: 20px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 40px;
  cursor: pointer;
  margin-left: 10vw;
}
.login-page-input-label{
  min-width: 250px;
}
@media only screen and (max-width: 750px) {
  .login-page-user-line{
    flex-direction: column;
  }
  .login-page-input{
    width: 100%;
  }
  .login-page-input-label{
    text-align: center;
  }
  .create-account-form-buttons-containear{
    flex-direction: column;
    margin-top: 80px;
  }
  .create-account-form-cancel-button{
    width: 60vw;
  }
  .create-account-form-create-button{
    margin-left: 0;
    margin-top: 15px;
    width: 60vw;
  }
  .login-page-title{
    margin-top: 90px;
  }
}
</style>
