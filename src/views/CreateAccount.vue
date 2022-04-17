<template>
  <div>
    <div class="create-account-title">
      Crie a sua conta.
    </div>
    <div class="row">
      <div class="create-account-form-colum">
        <div class="create-account-form-text">
          Nome de usuario:
        </div>
        <input v-model="userName" class="create-account-form-input" type="text">
      </div>
      <div class="create-account-form-colum create-account-form-second-colum">
        <div class="create-account-form-text">
          Email:
        </div>
        <input v-model="email" class="create-account-form-input" type="text">
      </div>
    </div>
    <div class="row  create-account-form-second-line">
      <div class="create-account-form-colum">
        <div class="create-account-form-text">
          Senha:
        </div>
        <input v-model="password" class="create-account-form-input" type="text">
      </div>
      <div class="create-account-form-colum create-account-form-second-colum">
        <div class="create-account-form-text">
          Confirme a senha:
        </div>
        <input v-model="secondPassword" class="create-account-form-input" type="text">
      </div>
    </div>
    <div class="create-account-form-buttons-containear">
      <div class="create-account-form-cancel-button">
        Voltar.
      </div>
      <div class="create-account-form-create-button">
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
      secondPassword: ''
    }
  }
}
</script>

<style scoped>
  .create-account-title{
    text-align: center;
    font-size: 55px;
    margin-top: 50px;
  }
  .row{
    display: flex;
    justify-content: space-around;
  }
  .create-account-form-text{
    font-size: 40px;
  }
  .create-account-form-input{
    margin-top: 10px;
    border: none;
    border: 2px solid lightseagreen;
    border-radius: 5px;
    font-size: 20px;
    padding: 15px;
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
    margin-top: 30px;
  }
  .create-account-form-colum{
    width: 30vw;
  }
  .create-account-form-buttons-containear{
    display: flex;
    justify-content: center;
    margin-top: 150px;
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
  @media only screen and (max-width: 1200px) {
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
</style>
