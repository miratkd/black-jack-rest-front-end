import { createStore } from 'vuex'

export default createStore({
  state: {
    backEndUrl: 'https://black-jack-rest.herokuapp.com/',
    account: undefined,
    isLoading: false,
    clientId: '21SjlWa69gM7HdPpLGlQnHrPsmNXgxEMF1XWSRkM',
    clientSecret: '2aQW0Wmbguj2XHHYGj8b6HNbRvP6VKn8L2NTx2h3mpGso03pMpiANK1pFRfYrWwNYQcHZHuXKTUvp4PIkHhr2eF10nVfEq76Ae9l4jfWbXKdJDSvZGrGtD3mgxqGmv40',
    accessToken: undefined
  },
  mutations: {
    saveAccount (state, account) {
      state.account = account
      localStorage.setItem('account', JSON.stringify(account))
    },
    cleanAccount (state) {
      state.account = undefined
      localStorage.removeItem('account')
    },
    loadAccount (state) { state.account = JSON.parse(localStorage.getItem('account')) },
    setIsLoading (state, value) { state.isLoading = value },
    setAccessToken (state, token) { state.accessToken = token }
  },
  actions: {
  },
  modules: {
  }
})
