<template>
  <el-card shadow="hover" class="card">
    <nuxt-link :to="{name: 'tutorials-id', params: {id: tutorial.id}}">
      <img :src="tutorial.image" class="image">
      <div style="padding: 14px;">
        <span>{{ tutorial.title }}</span>
      </div>
    </nuxt-link>
  </el-card>
</template>

<script>
export default {
  props: ['tutorial']
}
</script>

<style scoped>
.card {
  margin: 16px;
  width: calc(33.33% - 32px);
}

@media screen and (max-width: 768px){
  .card {
    margin: 8px;
    width: calc(50% - 16px);
  }
}
</style>