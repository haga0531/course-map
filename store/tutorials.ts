import { Tutorial, TutorialState, RootState} from './modules/tutorialType'
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { db } from '@/plugins/firebase'

export const state = (): TutorialState => ({
  tutorials: []
})

export const actions: ActionTree<TutorialState, RootState> = {
  async addTutorial ({ commit }, tutorialContent: Tutorial) {
    console.log(tutorialContent)
    const data = await db.collection('tutorials').add(tutorialContent)
    const key = data.id
    commit('ADD_TUTORIAL', {...tutorialContent, id: key})
    return key
  },

  async deleteTutorial ({ commit }, tutorialId) {
    db.collection('tutorials').doc(tutorialId).delete()
    commit('DELETE_TUTORIAL', tutorialId)
  },

  async fetchTutorials ({ commit }) {
    const tutorials: Tutorial[] = []
    const querySnapshot = await db.collection('tutorials').get()
    querySnapshot.forEach(doc => {
      tutorials.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        link: doc.data().link,
        image: doc.data().image,
        fee: doc.data().fee,
        language: doc.data().language,
        categories: doc.data().categories,
        created_at: doc.data().created_at,
        likeCount: doc.data().likeCount,
        selected: doc.data().selected,
        creatorId: doc.data().creatorId
      })
    })
    commit('FETCH_TUTORIAL', tutorials)
  }
}

export const mutations: MutationTree<TutorialState> = {
  FETCH_TUTORIAL (state, payload) {
    state.tutorials = payload
  },
  ADD_TUTORIAL (state, payload) {
    state.tutorials.push(payload)
  },
  DELETE_TUTORIAL (state, payload) {
    const tutorials = state.tutorials.filter(v => v.id !== payload)
    state.tutorials = tutorials
  }
}

export const getters: GetterTree<TutorialState, RootState> = {
  tutorial (state) {
    return (id: string) => {
      return state.tutorials.find(tutorial => {
        return tutorial.id === id
      })
    }
  }
}