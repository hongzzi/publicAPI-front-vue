<template>
  <b-container>
    <div class="row">
      <div class="col-lg-3 mb-4">
        <Menu></Menu>
      </div>
      <!-- Content Column -->
      <div class="col-lg-9 mb-4">
        <router-view></router-view>
      </div>
    </div>
  </b-container>
</template>

<script>
import Menu from "./MyPageMenu";
import router from "../../../../router/router";

export default {
  router,
  components: {
    Menu
  }
};
</script>

<style>
</style>