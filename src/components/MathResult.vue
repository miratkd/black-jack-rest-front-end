<template>
  <div class="modal-container">
    <div class="page-content" :style="getWinBorder()">
      <span v-if="isWin" class="material-icons win-icon">emoji_events</span>
      <span v-else class="material-icons lose-icon">highlight_off</span>
      <div v-if="isWin" class="modal-title">Parabéns!</div>
      <div  v-else class="modal-title">Desculpe...</div>
      <div v-if="isWin" class="modal-text">Você ganhou a partida e levou {{prize}} tickets!</div>
      <div v-else class="modal-text">Você perdeu esta partida, boa sorte na próxima.</div>
      <div class="close-modal-button" v-on:click="closeMath()">Terminar partida</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MathResult',
  props: ['isWin', 'prize'],
  methods: {
    getWinBorder () { if (this.isWin) return 'border: 3px solid yellow' },
    closeMath () {
      localStorage.removeItem('activeMath')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.modal-container{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2px);
  backdrop-filter: brightness(60%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
}
.page-content{
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.win-icon{
  color: yellow;
  font-size: 10em;
}
.lose-icon{
  font-size: 10em;
  color: red;
}
.modal-title{font-size: 3em;}
.modal-text{
  font-size: 2em;
  margin-top: 2vh;
}
.close-modal-button{
  background-color: lightseagreen;
  color: white;
  padding: 1vw;
  border-radius: 10px;
  font-size: 2em;
  border: 3px solid lightsalmon;
  text-align: center;
  width: 15vw;
  margin-top: 2vh;
  cursor: pointer;
}
</style>
