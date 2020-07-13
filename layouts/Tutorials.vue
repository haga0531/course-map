<template>
  <section class="section-wrap">
    <div class="grid_row action-box">
      <select v-model="type">
        <option value="created_at">新着順</option>
        <option value="likeCount">いいね順</option>
      </select>
      <el-input
        placeholder="Keyword..."
        prefix-icon="el-icon-search"
        v-model="keyword"
        class="search-box">
      </el-input>
       <div v-for="(category,index) in categories" :key="index">
        <el-checkbox v-model="category.checked" :label="category.value" border></el-checkbox>
      </div>
    </div>
    <div class="grid_row">
      <Card :tutorial="tutorial" v-for="tutorial in filterdTutorialList" :key="tutorial.id" />
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card'
import categories from '@/assets/categories'

export default {
  components: {
    Card
  },
  data () {
    return {
      type: 'created_at',
      categories: categories,
      keyword: ''
    }
  },
  computed: {
    tutorials () {
      return this.$store.state.tutorials.tutorials
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
}

.action-box {
  margin: 0 16px;
}

.image {
  width: 100%;
  display: block;
}

.el-checkbox.is-bordered {
  border-radius: 30px !important;
  margin: .2rem !important;
}
</style>