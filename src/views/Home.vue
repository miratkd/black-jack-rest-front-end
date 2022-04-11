<template>
  <div class="home-page">
    <div class="home-page-title">
      Bem vindo ao Black-Jack-Rest!
    </div>
    <div class="home-page-subtitle">
      Black-Jack-Rest é o lugar perfeito para você se divertir em empougantes partidas de black-jack, sem precisar sair de casa, ou gastar um centavo se quer!
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  .home-page{
    background-color: lightgray;
    min-height: 93.2vh;
  }
  .home-page-title{
    text-align: center;
    padding-top: 50px;
    font-size: 40px;
    font-weight: 700;
    color: lightseagreen;
  }
  .home-page-subtitle{
    text-align: center;
    padding-top: 10px;
    font-size: 30px;
    font-weight: 500;
    color: lightseagreen;
  }
</style>
