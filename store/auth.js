export const strict = false

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  }
}

export const actions = {
  setUser ({ commit }, user) {
    commit('SET_USER',user)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}