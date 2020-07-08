<template>
  <section class="section-wrap">
    <div class="grid_row">
      <Card :tutorial="tutorial" v-for="tutorial in tutorials" :key="tutorial.id" />
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  computed: {
    tutorials () {
      return this.$store.state.tutorials.tutorials
    }
  }
}
</script>

<style>
.section-wrap {
  margin: 0 auto;
  max-width: 1024px;
  padding: 0 1rem;
  text-align: center;
  width: 100%;
}

.grid_row {
  display: flex;
  flex-flow: row wrap;
}

.image {
  width: 100%;
  display: block;
}
</style>