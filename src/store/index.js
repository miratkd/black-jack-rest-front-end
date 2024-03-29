import { createStore } from 'vuex'
import { useToast } from 'vue-toastification'

export default createStore({
  state: {
    backEndUrl: 'https://web-production-0cf1.up.railway.app/',
    localBackEndUrl: 'http://127.0.0.1:8000/',
    account: undefined,
    isLoading: true,
    clientId: 'dOdNQw5sgki7t4boZQZQdztZQATQsYMo58QYbRxF',
    clientSecret: 'CwHndWOtdXikU6RsLaaNeei1tKvuN3y9Arb2Htxxc9d15j31S7YPwXsDWP7Tn2bU6deh5RcascMqycIocFfw8KegeU9e7a9H46Gde7HWGIBIeELSNNCyANkw6rK2g8fu',
    accessToken: undefined,
    refreshToken: undefined,
    axios: require('axios'),
    toast: useToast()
  },
  mutations: {
    saveAccount (state, account) { state.account = account },
    cleanAccount (state) {
      state.account = undefined
      state.accessToken = undefined
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
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
      let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      const params = new URLSearchParams()
      params.append('grant_type', 'password')
      params.append('username', payload.userName)
      params.append('client_id', context.state.clientId)
      params.append('password', payload.password)
      params.append('client_secret', context.state.clientSecret)
      return context.state.axios.post(context.state.backEndUrl + 'o/token/', params, config).then(response => {
        context.commit('setTokens', {
          accessToken: response.data.token_type + ' ' + response.data.access_token,
          refreshToken: response.data.refresh_token
        })
        config = { headers: { Authorization: context.state.accessToken } }
        return context.state.axios.get(context.state.backEndUrl + 'account/me/', config).then(response => {
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
    },
    refreshToken (context) {
      return new Promise(function (resolve, reject) {
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        const params = new URLSearchParams()
        params.append('grant_type', 'refresh_token')
        params.append('client_id', context.state.clientId)
        params.append('client_secret', context.state.clientSecret)
        params.append('refresh_token', context.state.refreshToken)
        context.state.axios.post(context.state.backEndUrl + 'o/token/', params, config).then(response => {
          context.commit('setTokens', {
            accessToken: response.data.token_type + ' ' + response.data.access_token,
            refreshToken: response.data.refresh_token
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
