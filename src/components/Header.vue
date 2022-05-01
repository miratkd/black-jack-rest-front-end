<template>
  <div class="header-containear">
    <div v-on:click="sendHome()" class="header-title">Black-Jack-Rest</div>
    <div v-if="$store.state.account" class="header-title">{{$store.state.account.user.username}}</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    sendHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .header-containear{
    display: flex;
    align-items: center;
    background-color: lightseagreen;
    padding: 10px;
    justify-content: space-between;
  }
  .header-title{
    font-size: 40px;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
</style>
