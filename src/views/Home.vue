<template>
  <div class="home-page">
    <div class="home-page-title">
      Bem vindo ao Black-Jack-Rest!
    </div>
    <div class="home-page-subtitle">
      Black-Jack-Rest é o lugar perfeito para você se divertir em empougantes partidas de black-jack, sem precisar sair de casa, ou gastar um centavo se quer!
    </div>
    <div class="home-page-buttons-containear">
      <router-link to="/criar-conta" class="home-page-button">
        Criar uma conta.
      </router-link>
      <router-link to="/login" class="home-page-button">
        Ja tenho uma conta.
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    if (this.$store.state.account) this.$router.push('/eu')
  }
}
</script>

<style scoped>
  .home-page-title{
    text-align: center;
    padding-top: 50px;
    font-size: 40px;
    font-weight: 700;
  }
  .home-page-subtitle{
    text-align: center;
    padding: 50px 100px 0 100px;
    font-size: 33px;
    font-weight: 500;
  }
  .home-page-buttons-containear{
    display: flex;
    justify-content: space-evenly;
    margin-top: 200px;
  }
  .home-page-button{
    background-color: lightseagreen;
    color: white;
    padding: 100px 0;
    text-align: center;
    width: 35%;
    border-radius: 10px;
    cursor: pointer;
    font-size: 45px;
  }
</style>
