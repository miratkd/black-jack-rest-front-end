<template>
  <div>
    <div class="create-account-title">
      Crie a sua conta.
    </div>
    <div class="row">
      <div>
        <div>
          Nome de usuario:
        </div>
        <input type="text">
      </div>
      <div>2</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAccount'
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
</style>
