<template>
  <div id="wrapper">
    <Header />
    <div class="main">
      <success-message/>
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { auth, db } from '@/plugins/firebase'
import { UserClass } from '@/store/modules/userTypes'
import SuccessMessage from '@/components/SuccessMessage.vue'

@Component({
  components: {
    Header,
    Footer,
    SuccessMessage
  }
})
export default class Default extends Vue {
  mounted () {
    this.$store.dispatch('tutorials/fetchTutorials')
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('auth/setUser', new UserClass(user.displayName, user.photoURL, user.uid))
        db.collection('users').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      } else {
        this.$store.dispatch('auth/setUser', null)
      }
    })
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body, #wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a {
  color: black;
  text-decoration: none;
}

.main {
  margin-bottom: 30px;
}

.vs__actions {
  display: none !important;
}
</style>
