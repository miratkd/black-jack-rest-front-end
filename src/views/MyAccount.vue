<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      account: undefined
    }
  },
  mounted () {
    this.account = this.$store.state.account
  }
}
</script>
