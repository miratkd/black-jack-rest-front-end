<template>
  <div class="header-containear">
    <div v-on:click="sendHome()" class="header-title">Black-Jack-Rest</div>
    <div class="header-title">{{$store.state.account.user.username}}</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    sendHome () {
      this.$router.push('/')
    }
  },
  mounted () {
    console.log(this.$store.state.account.user.id)
  }
}
</script>

<style scoped>
  .header-containear{
    display: flex;
    align-items: center;
    background-color: lightseagreen;
    padding: 10px;
  }
  .header-title{
    font-size: 40px;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
</style>
