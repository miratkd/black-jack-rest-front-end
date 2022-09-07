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
      <router-link to="/login" class="home-page-button home-page-second-button">
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
  .home-page{
    font-size: 1vw;
  }
  .home-page-title{
    text-align: center;
    padding-top: 50px;
    font-size: 4.5em;
    font-weight: 700;
  }
  .home-page-subtitle{
    text-align: center;
    padding: 50px 100px 0 100px;
    font-size: 3em;
    font-weight: 500;
  }
  .home-page-buttons-containear{
    display: flex;
    justify-content: space-evenly;
    margin: 7vh 0;
  }
  .home-page-button{
    background-color: lightseagreen;
    color: white;
    padding: 5vh 0;
    text-align: center;
    width: 40%;
    border-radius: 10px;
    cursor: pointer;
    font-size: 4em;
  }
@media only screen and (max-width: 950px) {
  .home-page{
    font-size: 1.25vw;
  }
}
@media only screen and (max-width: 750px) {
  .home-page{
    font-size: 1.5vw;
  }
}
@media only screen and (max-width: 650px) {
  .home-page{
    font-size: 1.75vw;
  }
  .home-page-buttons-containear{
    flex-direction: column;
    align-items: center;
  }
  .home-page-button{
    width: 90%;
  }
  .home-page-second-button{
    margin-top: 5vh;
  }
  .home-page-subtitle{
    padding: 4vh 5vw;
  }
  .home-page-title{
    padding: 2vh 3vw;
  }
}
</style>
