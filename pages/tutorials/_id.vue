<template>
  <section class="section-wrap detail-page">
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
        <div class="module-spacer-mini" />
        <div v-if="userIsCreator">
          <span class="deleteButton" @click="centerDialogVisible = true"><i class="el-icon-delete">削除する</i></span>
        </div>
      </div>
    </div>
    <el-dialog
      :title="`${tutorial.title}を削除`"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>本当に削除しますか？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="deleteTutorial">削除する</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex'
import { Tutorial } from '@/store/modules/tutorialType'

@Component
export default class _id extends Vue {
  centerDialogVisible: boolean = false

  get userIsCreator () {
    if (this.$store.state.auth.user == null) return
    return this.$store.state.auth.user.uid === this.tutorial.creatorId
  }

  get tutorials () {
    return this.$store.state.tutorials.tutorials
  }

  get tutorial () {
    return this.tutorials.find((tutorial: Tutorial) => tutorial.id === this.$route.params.id) || {}
  }

  async deleteTutorial () {
    await this.$store.dispatch('tutorials/deleteTutorial', this.tutorial.id)
    this.centerDialogVisible = false
    this.$router.push('/')
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

.detail-page {
  padding-top: 90px;
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

.deleteButton {
  cursor: pointer;
  border-bottom: 1px solid #1f4068;
}
</style>