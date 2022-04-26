import { createStore } from 'vuex'

export default createStore({
  state: {
    backEndUrl: 'https://black-jack-rest.herokuapp.com/',
    account: undefined
  },
  mutations: {
    saveAccount (state, account) {
      state.account = account
      localStorage.setItem('account', JSON.stringify(account))
    },
    loadAccount (state) {
      state.account = JSON.parse(localStorage.getItem('account'))
    }
  },
  actions: {
  },
  modules: {
  }
})
