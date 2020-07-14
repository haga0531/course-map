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
            placeholder="Keyword..."
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

<script>
import Card from '@/components/Card'
import TopImageArea from '@/components/TopImageArea'
import categories from '@/assets/categories'

export default {
  components: {
    Card,
    TopImageArea
  },
  data () {
    return {
      type: 'created_at',
      categories: categories,
      keyword: '',
      count: 18
    }
  },
  computed: {
    tutorials () {
      return this.$store.state.tutorials.tutorials
    },
    displayTutorialList () {
      return this.filterdTutorialList.slice(0, this.count)
    },
    filterdTutorialList () {
      return this.tutorials.filter(tutorial => {
        return (
          (tutorial.title.indexOf(this.keyword) !== -1 || tutorial.description.indexOf(this.keyword) !== -1)
          && 
          (this.selectedCheckboxes.every(val => tutorial.categories.indexOf(val) >= 0))
        )
      }).sort((a,b) => {
        if (this.type == "created_at") {
          return a.created_at - b.created_at
        }
          return b.likeCount - a.likeCount
      })
    },
    selectedCheckboxes () {
			const filters = []
      const checkedBoxes = this.categories.filter(category => category.checked)
			checkedBoxes.forEach(element => {
				filters.push(element.value)
      })
			return filters
		}
  },
  methods: {
    showMore () {
      this.count += 18
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
</style>