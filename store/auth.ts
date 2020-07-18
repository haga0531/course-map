import { UserState, RootState} from './modules/userTypes'
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export const strict = false

export const state = (): UserState => ({
  user: null
})

export const mutations: MutationTree<UserState> = {
  SET_USER (state, payload) {
    state.user = payload
  }
}

export const actions: ActionTree<UserState, RootState> = {
  setUser ({ commit }, user) {
    commit('SET_USER',user)
  }
}

export const getters: GetterTree<UserState, RootState> = {
  isAuthenticated (state) {
    return !!state.user
  }
}