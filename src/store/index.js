import { createStore } from 'vuex'

export default createStore({
  state: {
    backEndUrl: 'https://black-jack-rest.herokuapp.com/',
    localBackEndUrl: 'http://127.0.0.1:8000/',
    account: undefined,
    isLoading: true,
    clientId: '21SjlWa69gM7HdPpLGlQnHrPsmNXgxEMF1XWSRkM',
    clientSecret: '2aQW0Wmbguj2XHHYGj8b6HNbRvP6VKn8L2NTx2h3mpGso03pMpiANK1pFRfYrWwNYQcHZHuXKTUvp4PIkHhr2eF10nVfEq76Ae9l4jfWbXKdJDSvZGrGtD3mgxqGmv40',
    accessToken: undefined,
    refreshToken: undefined
  },
  mutations: {
    saveAccount (state, account) { state.account = account },
    cleanAccount (state) {
      state.account = undefined
      state.accessToken = undefined
      localStorage.removeItem('accessToken')
    },
    setIsLoading (state, value) { state.isLoading = value },
    setTokens (state, tokens) {
      state.accessToken = tokens.accessToken
      localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken))
      state.refreshToken = tokens.refreshToken
      localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken))
    }
  },
  actions: {
    login (context, payload) {
      const axios = require('axios')
      let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      const params = new URLSearchParams()
      params.append('grant_type', 'password')
      params.append('username', payload.userName)
      params.append('client_id', context.state.clientId)
      params.append('password', payload.password)
      params.append('client_secret', context.state.clientSecret)
      return axios.post(context.state.backEndUrl + 'o/token/', params, config).then(response => {
        context.commit('setTokens', {
          accessToken: response.data.token_type + ' ' + response.data.access_token,
          refreshToken: response.data.refresh_token
        })
        config = { headers: { Authorization: context.state.accessToken } }
        return axios.get(context.state.backEndUrl + 'account/me/', config).then(response => {
          context.commit('saveAccount', response.data)
          return { success: true, message: '' }
        })
      }).catch(error => {
        if (error.response.data.error_description === 'Invalid credentials given.') {
          return { success: false, message: 'Senha ou usuario incoretos.' }
        } else {
          return { success: false, message: 'Desculpe, não foi posivel fazer o login.' }
        }
      })
    }
  },
  modules: {
  }
})
