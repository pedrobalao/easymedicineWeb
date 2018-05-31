import auth from '@/auth/auth'
import axios from 'axios'

const state = {
  user: null,
  isLoggedIn: auth.isLoggedIn()
}

const getters = {
  user: state => state.user,
  isLogged: state => state.isLoggedIn
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  }
}

const actions = {
  setCurrentUser: ({ commit }) => {
    commit('setUser', auth.user())
    if (auth.user() == null) {
      localStorage.removeItem('user')
      return localStorage.removeItem('token')
    }
    auth.user().getIdToken(true).then((idToken) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken
      localStorage.setItem('token', idToken)
      /*
      axios.post(process.env.API_BASE_URL + '/auth/authorize', {token: idToken})
        .then(response => {
          commit('setUser', auth.user())
        }).catch(() => {
          auth.logout()
        }) */
    }).catch((error) => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
