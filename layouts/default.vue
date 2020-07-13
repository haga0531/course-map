<template>
  <div>
    <Header />
    <div class="main">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { auth, db } from '@/plugins/firebase'

export default {
  components: {
    Header
  },
  mounted () {
    this.$store.dispatch('tutorials/fetchTutorials')
    auth.onAuthStateChanged(user => {
      const { uid, displayName, photoURL} = user
      if (user) {
        this.$store.dispatch('auth/setUser', { uid, displayName, photoURL})
        db.collection('users').doc(uid).set({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL
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

a {
  color: black;
  text-decoration: none;
}

.main {
  padding: 50px 0;
}

.vs__actions {
  display: none !important;
}
</style>
