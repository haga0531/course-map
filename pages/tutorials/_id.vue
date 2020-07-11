<template>
  <section class="section-wrap">
    <div class="grid_row">
      <img :src="tutorial.image" class="image" />
      <div class="box">
        <h2>{{tutorial.title}}</h2>
        <div class="module-spacer" />
        <p>{{tutorial.description}}</p>
        <div class="module-spacer" />
        <p v-if="tutorial.fee">{{tutorial.fee}}</p>
        <p v-else>無料</p>
        <div class="module-spacer" />
        <el-tag type="info" v-for="category in tutorial.categories" :key="category.name">
          {{ category }}
        </el-tag>
        <div class="module-spacer" />
        <a :href="tutorial.link"><el-button type="primary" icon="el-icon-s-promotion">サイトにいく</el-button></a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      tutorials: state => state.tutorials.tutorials
    }),
    tutorial () {
      return this.tutorials.find(tutorial => tutorial.id === this.$route.params.id) || {}
    }
  }
}
</script>

<style scoped>
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
  width: 400px;
}

.box {
  text-align: left;
  margin: 0 auto 16px auto;
  width: 350px;
}

.module-spacer {
    height: 12px
}

.el-tag {
  border-radius: 30px !important;
  margin-right: .5rem;
}
</style>