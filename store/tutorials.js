import { db } from '@/plugins/firebase'

export const state = () => ({
  tutorials: []
})

export const mutations = {
  FETCH_TUTORIAL (state, payload) {
    state.tutorials = payload
  },
  ADD_TUTORIAL (state, payload) {
    state.tutorials.push(payload)
  }
}

export const actions = {
  async fetchTutorials ({ commit }) {
    const tutorials = []
    const querySnapshot = await db.collection('tutorials').orderBy('created_at', 'desc').get()
    querySnapshot.forEach(doc => {
      tutorials.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        link: doc.data().link,
        image: doc.data().image,
        fee: doc.data().fee,
        categories: doc.data().categories,
        created_at: new Date().getTime(),
        likeCount: 0
      })
    })
    commit('FETCH_TUTORIAL', tutorials)
  },
  async addTutorial ({ commit }, tutorialContent) {
    await db.collection('tutorials').add(tutorialContent)
    commit('ADD_TUTORIAL', tutorialContent)
  }
}

export const getters = {
  tutorial (state) {
    return (id) => {
      return state.tutorials.find(tutorial => {
        return tutorial.id === id
      })
    }
  }
}