<template>
  <div class="modal-container" v-on:click="closeDialog()">
    <div class="page-content" v-on:click.stop>test</div>
  </div>
</template>

<script>
export default {
  name: 'CreateMath',
  props: ['closeDialog'],
  mounted () { document.documentElement.style.overflow = 'hidden' },
  unmounted () { document.documentElement.style.overflow = 'auto' }
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
}
</style>
