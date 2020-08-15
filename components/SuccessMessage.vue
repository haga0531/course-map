<template>
  <transition name="fade">
    <div v-if="notice.status" class="success">{{notice.message}}</div>
  </transition>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SuccessMessage extends Vue {
  get notice () {
      return this.$store.state.successMessage.successMessage;
    }
};
</script>

<style scoped>
.success {
  position: fixed;
  top: 30;
  z-index: 50;
  text-align: center;
  line-height: 56px;
  width: 100%;
  background: #32e0c4;
  color: #fff;
  font-size: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
