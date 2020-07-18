<template>
  <main>
    <Tutorials />
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Tutorials from '@/layouts/Tutorials.vue'

@Component({
  components: {
    Tutorials
  }
})
export default class Index extends Vue {
}
</script>