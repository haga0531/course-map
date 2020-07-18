<template>
  <div class="main-visual">
    多くのサービスから
    あなたに適したコースを探しましょう。
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default class TopImageArea extends Vue { 
}
</script>

<style scoped>
.main-visual {
  background-image: url("~assets/img/main-visual.jpg");
  background-position: center;
  background-size: cover;
  height: 500px;
  margin-bottom: 40px;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  justify-content: center;
  display: flex;
  text-shadow: 0 0 20px #ffffff;
  color: #303133;
}
</style>