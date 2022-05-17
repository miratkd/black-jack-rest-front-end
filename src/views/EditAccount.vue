<template>
  <div>
    <div class="page-title">Edite sua conta.</div>
    <div class="page-input-row">
      <div class="page-input-text">Primeiro nome:</div>
      <div class="page-input-containear">
        <input class="page-input" type="text">
      </div>
    </div>
    <div class="page-input-row">
      <div class="page-input-text">Segundo nome:</div>
      <div class="page-input-containear">
        <input class="page-input" type="text">
      </div>
    </div>
    <div class="page-input-row">
      <div class="page-input-text">Email:</div>
      <div class="page-input-containear">
        <input class="page-input" type="text">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditAccount'
}
</script>

<style scoped>
.page-title{
  margin-top: 10vh;
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
.page-input:focus{
  outline: none;
}
</style>
