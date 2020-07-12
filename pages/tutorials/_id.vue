<template>
  <section class="section-wrap">
    <div class="grid_row">
      <img :src="tutorial.image" class="image" />
      <div class="box">
        <h2 style="font-size: 36px;">{{tutorial.title}}</h2>
        <div class="module-spacer-mini" />
        <p><el-tag>詳細</el-tag><span class="el-icon-caret-right" />{{tutorial.description}}</p>
        <div class="module-spacer-mini" />
        <p v-if="tutorial.fee"><el-tag>料金</el-tag><span class="el-icon-caret-right" />{{tutorial.fee}}円</p>
        <p v-else><el-tag>料金</el-tag><span class="el-icon-caret-right" />無料</p>
        <div class="module-spacer-mini" />
        <p><el-tag>言語</el-tag><span class="el-icon-caret-right" />{{tutorial.language}}</p>
        <div class="module-spacer-mini" />
        <el-tag>ジャンル</el-tag><span class="el-icon-caret-right" />
        <el-tag style="background-color: #fff;" v-for="category in tutorial.categories" :key="category.name">
          {{ category }}
        </el-tag>
        <div class="module-spacer-big" />
        <a :href="tutorial.link"><el-button type="primary" icon="el-icon-link">サイトにいく</el-button></a>
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
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
}

.box {
  text-align: left;
  margin: 0 auto 16px auto;
  width: 350px;
}

.module-spacer-mini {
  height: 25px
}

.module-spacer-big {
  height: 45px
}

.el-tag {
  border-radius: 30px !important;
  margin-right: .5rem;
}
</style>