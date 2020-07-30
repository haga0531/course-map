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
        <div class="sns">
          <a :href="tutorial.link"><el-button type="primary" icon="el-icon-link">サイトにいく</el-button></a>
          <div class="social-button">
            <a :href="twitterURL" class="social-button social-button-tw" target="_blank" rel="nofollow">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 350 300">
                <defs>
                  <style>
                    .fill {fill: #fff;}
                  </style>
                </defs>
                <path class="fill" d="M350.001,35.509 C346.026,42.167 340.649,49.197 333.870,56.595 C328.493,62.513 321.944,68.556 314.231,74.720 C314.231,74.720 314.231,76.940 314.231,76.940 C314.231,76.940 314.231,79.530 314.231,79.530 C314.231,80.762 314.346,81.626 314.579,82.119 C314.579,82.119 314.579,84.708 314.579,84.708 C314.579,110.109 310.022,135.572 300.903,161.097 C291.785,186.620 278.809,209.494 261.975,229.715 C243.971,251.417 222.113,268.556 196.394,281.134 C170.674,293.711 141.917,299.999 110.122,299.999 C89.546,299.999 70.142,297.041 51.904,291.122 C33.201,285.202 15.899,276.818 -0.001,265.967 C0.936,266.214 2.337,266.338 4.208,266.338 C7.948,266.831 10.755,267.077 12.626,267.077 C12.626,267.077 17.183,267.077 17.183,267.077 C33.550,267.077 49.567,264.242 65.231,258.569 C79.727,253.144 93.403,245.253 106.263,234.895 C91.300,234.649 77.387,229.469 64.531,219.357 C51.904,209.494 43.486,197.040 39.279,181.997 C42.786,182.737 45.007,183.105 45.943,183.105 C45.943,183.105 49.447,183.105 49.447,183.105 C50.151,183.352 51.202,183.476 52.605,183.476 C54.708,183.476 56.346,183.352 57.516,183.105 C59.853,183.105 63.128,182.612 67.335,181.626 C67.801,181.626 68.505,181.502 69.439,181.256 C70.376,181.009 71.075,180.887 71.542,180.887 C54.941,177.434 41.265,168.679 30.509,154.622 C19.520,140.565 14.029,124.536 14.029,106.534 C14.029,106.534 14.029,106.163 14.029,106.163 C14.029,106.163 14.029,105.794 14.029,105.794 C14.029,105.794 14.029,105.424 14.029,105.424 C18.471,108.383 23.615,110.603 29.460,112.082 C35.538,114.054 41.265,115.042 46.644,115.042 C36.354,107.644 28.640,98.642 23.497,88.038 C17.651,77.187 14.729,65.102 14.729,51.786 C14.729,44.388 15.546,37.729 17.183,31.810 C18.120,27.617 20.457,21.576 24.198,13.685 C42.435,37.358 64.177,55.854 89.429,69.172 C115.382,83.475 142.969,91.366 172.195,92.847 C171.494,87.667 171.145,84.832 171.145,84.339 C170.674,80.886 170.441,78.051 170.441,75.830 C170.441,54.868 177.456,36.989 191.483,22.193 C205.512,7.396 222.462,-0.002 242.337,-0.002 C252.623,-0.002 262.325,2.094 271.444,6.286 C280.562,10.971 288.394,16.891 294.942,24.042 C302.423,22.315 310.372,19.850 318.788,16.644 C325.803,13.931 333.051,10.232 340.532,5.547 C337.729,14.424 333.634,22.439 328.260,29.591 C322.179,36.989 315.751,42.907 308.969,47.347 C315.984,46.113 322.999,44.634 330.010,42.907 C335.388,41.428 342.052,38.961 350.001,35.509 Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="module-spacer-mini" />
        <div v-if="userIsCreator">
          <span class="deleteButton" @click="centerDialogVisible = true"><i class="el-icon-delete">削除する</i></span>
        </div>
      </div>
    </div>
    <el-dialog
      :title="`${tutorial.title}を削除`"
      :visible.sync="centerDialogVisible"
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

  get twitterURL () {
    return 'https://twitter.com/intent/tweet?url=https://tutorials-list.web.app/'
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

.sns {
  display: flex;
}

.deleteButton {
  cursor: pointer;
  border-bottom: 1px solid #1f4068;
}

.social-button{
  text-align: center;
}

.social-button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 39.55px;
  border-radius: 4px;
  margin: 0 10px;
}

.social-button-tw{
 background: #55acee;
}

@media screen and (max-width: 620px) {
  .image {
    width: 100%;
  }
}
</style>