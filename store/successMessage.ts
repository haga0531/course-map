import { SuccessMessageState } from './modules/successMessageTypes'
import { MutationTree } from 'vuex';

export const strict = false

export const state = (): SuccessMessageState => ({
  successMessage: {
    status: false,
    message: ''
  }
})

export const mutations: MutationTree<SuccessMessageState> = {
  SET_SUCCESS_MESSAGE (state, payload) {
    state.successMessage = payload
  }
}