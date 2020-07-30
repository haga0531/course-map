<template>
  <div>
    <TopImageArea />
    <section class="section-wrap">
      <div class="grid_row action-box">
        <div class="form-title">検索</div>
        <div class="action_without-tags">
          <el-select v-model="type" placeholder="新着順">
            <el-option value="created_at" label="新着順">新着順</el-option>
            <el-option value="likeCount" label="評価順">いいね順</el-option>
          </el-select>
          <el-input
            placeholder="Railsチュートリアル ..."
            prefix-icon="el-icon-search"
            v-model="keyword"
            class="search-box">
          </el-input>
        </div>
        <div v-for="(category,index) in categories" :key="index">
          <el-checkbox v-model="category.checked" :label="category.value" border></el-checkbox>
        </div>
      </div>
      <div class="grid_row">
        <Card :tutorial="tutorial" v-for="tutorial in displayTutorialList" :key="tutorial.id" />
      </div>
      <el-button class="showMoreButton" @click="showMore" v-if="(displayTutorialList.length - count) >= 0">More...</el-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import { TutorialClass } from '@/store/modules/tutorialType'
import TopImageArea from '@/components/TopImageArea.vue'
import { categoryTypes } from '@/store/modules/categories'
const categories = require('@/assets/categories.json')

@Component({
  components: {
    Card,
    TopImageArea
  }
})
export default class Tutorials extends Vue {
  type: string = 'created_at'
  categories: any = categories
  keyword: string = ''
  count: number = 18


  get tutorials () {
      return this.$store.state.tutorials.tutorials
  }
    
  get displayTutorialList () {
      return this.filterdTutorialList.slice(0, this.count)
  }
    
  get filterdTutorialList () {
      return this.tutorials.filter((tutorial: TutorialClass) => {
        return (
          (tutorial.title.indexOf(this.keyword) !== -1 || tutorial.description.indexOf(this.keyword) !== -1)
          && 
          (this.selectedCheckboxes.every((val: any) => tutorial.categories.indexOf(val) >= 0))
        )
      }).sort((a: TutorialClass, b: TutorialClass) => {
        if (this.type == "created_at") {
          return b.created_at - a.created_at
        }
          return b.likeCount - a.likeCount
      })
  }
    
  get selectedCheckboxes () {
			const filters: categoryTypes[] = []
      const checkedBoxes = this.categories.filter((category: categoryTypes) => category.checked)
			checkedBoxes.forEach((element: any) => {
				filters.push(element.value)
      })
			return filters
	}

  showMore () {
    this.count += 18
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

.search-box {
  margin-bottom: 20px;
  flex-basis: auto;
}

.action-box {
  margin: 0 16px;
  box-shadow: 0 0 4px #eae6dc;
  padding: 32px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.form-title {
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #303133;
}

.action_without-tags {
  display: flex;
  width: 100%;
}

.el-select {
  flex-basis: 20%;
  margin-right: 10px;
}

.image {
  width: 100%;
  display: block;
}

.el-checkbox.is-bordered {
  border-radius: 30px !important;
  margin: .2rem !important;
}

.showMoreButton {
  width: 100%;
  margin: 30px 16px !important;
}

@media screen and (max-width: 620px) {
  .showMoreButton {
    width: 100%;
    margin: 0 !important;
  }
}
</style>