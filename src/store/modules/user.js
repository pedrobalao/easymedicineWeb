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
  },
  setIsLoggedIn: (state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  }
}

const actions = {
  setCurrentUser: ({ commit }, user) => {
    commit('setUser', user)
    if (user == null) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return commit('setIsLoggedIn', false)
    }
    user.getIdToken(true).then((idToken) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken
      localStorage.setItem('token', idToken)
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
