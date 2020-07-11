<template>
  <el-card shadow="hover" class="card">
      <el-button class="star-icon likedButton" v-if="beLiked" @click="disLike">
        <i class="el-icon-caret-top" style="color: red;"/>
        <span class="icon-number" style="color: red;">{{ likeCount }}</span>
      </el-button>
      <el-button class="star-icon" v-else @click="like">
        <i class="el-icon-caret-top"/>
        <span class="icon-number">{{ likeCount }}</span>
      </el-button>
    <nuxt-link :to="{name: 'tutorials-id', params: {id: tutorial.id}}">
      <img :src="tutorial.image" class="image">
      <div style="padding: 14px;" class="card-box">
        <span>{{ tutorial.title }}</span>
      </div>
      <div class="card-box">
        <el-tag type="info" v-for="category in tutorial.categories" :key="category.name">
          {{ category }}
        </el-tag>
      </div>
    </nuxt-link>
  </el-card>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  props: ['tutorial'],
  data () {
    return {
      beLiked: false,
      likeCount: 0
    }
  },
  mounted () {
    this.likeRef = db.collection('tutorials').doc(this.tutorial.id).collection('likes')
    this.checkLikeStatus()
    this.likeRef.onSnapshot(snapshot => {
      this.likeCount = snapshot.size
    })
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async like () {
      await this.likeRef.doc(this.currentUser.uid).set({ uid: this.currentUser.uid })
      await db.collection('tutorials').doc(this.tutorial.id).update({
        likeCount: this.likeCount
      })
      this.beLiked = true
    },
    async disLike (){
      await this.likeRef.doc(this.currentUser.uid).delete()
      await db.collection('tutorials').doc(this.tutorial.id).update({
        likeCount: this.likeCount
      })
      this.beLiked = false
    },
    async checkLikeStatus () {
      const doc = await this.likeRef.doc(this.currentUser.uid).get()
      this.beLiked = doc.exists
    }
  }
}
</script>

<style scoped>
.card {
  margin: 16px;
  width: calc(33.33% - 32px);
  position: relative;
}

.star-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  /* width: 60px; */
  display: inline-flex;
  /* padding: 0; */
}

.likedButton {
  border-color: red;
}

.el-icon-caret-top + span {
  margin-left: 0 !important;
}

.icon-number {
  display: block;
  margin-left: 0;
}

.card-box {
  text-align: left;
}

.el-tag {
  border-radius: 30px !important;
  margin-right: .5rem;
}

@media screen and (max-width: 768px){
  .card {
    margin: 8px;
    width: calc(50% - 16px);
  }
}
</style>