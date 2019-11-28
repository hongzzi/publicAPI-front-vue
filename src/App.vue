<template>
  <div id="app">
    <div>
      <vHeader></vHeader>
      <vBody></vBody>
      <vFooter></vFooter>
      <vModal></vModal>
    </div>
  </div>
</template>

<script>
import vHeader from "./components/layout/Header.vue";
import vFooter from "./components/layout/Footer.vue";
import vBody from "./components/layout/Body.vue";
import vModal from "./components/layout/Modal.vue";
import router from "./router/router";

export default {
  router,
  name: "app",
  components: {
    vHeader,
    vFooter,
    vBody,
    vModal
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap");

* {
  font-family: "Nanum Gothic", sans-serif;
}
.content-header-tt {
  padding : 20px;
}
</style>
