export const state = () => ({
  notification: {
    status: false,
    message: ''
  }
})

export const mutations = {
  SET_NOTICE (state, payload) {
    state.notification = payload
  }
}

export const actions = {
  
}