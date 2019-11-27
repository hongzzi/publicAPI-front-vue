<template>
  <b-container>
    <router-view></router-view>
  </b-container>
</template>

<script>
import router from "../../router/router";
export default {
  router,
  data() {
    return {};
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>