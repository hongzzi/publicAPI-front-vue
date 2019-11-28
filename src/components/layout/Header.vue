<template>
  <div class="_header container">
    <div class="float-left">
      <img id="img-200" src="../../assets/logo.png" alt @click="goMain" />
    </div>
    <div>
      <b-navbar-nav>
        <b-button class="ml-auto" align="end" type="dark" variant="white">
          <b-nav-item v-if="auth">
            <router-link to="/mypage/history">
              <b-button variant="outline-success" class="top-nav-button">MyPage</b-button>
            </router-link>
            <b-button variant="outline-success" class="top-nav-button" @click="logout">로그아웃</b-button>
          </b-nav-item>
          <b-nav-item v-else>
            <b-button
              variant="outline-success"
              class="top-nav-button"
              v-b-modal.login-regist-modal
            >Login/Regist</b-button>
          </b-nav-item>
        </b-button>
      </b-navbar-nav>
    </div>
    <div>
      <b-nav align="end">
        <a class="navbar-brand" href="#">SAFE FOOD !</a>
        <b-nav-item @click="goFoodList">푸드검색</b-nav-item>
        <!-- <b-nav-item><img id="img-200" src="../../assets/logo.png" alt=""></b-nav-item> -->
        <b-nav-item @click="goNotice">공지사항</b-nav-item>
        <b-nav-item @click="goWeekMenu">주간메뉴</b-nav-item>
      </b-nav>
    </div>
    <!-- <div>
      <b-navbar></b-navbar>
    </div>-->
  </div>
</template>

<script>
import router from "../../router/router";

export default {
  router,
  data() {
    return {
      user: {}
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    },
    auth() {
      return this.$store.state.auth_flag;
    }
  },
  mounted() {
    if (sessionStorage.getItem("auth_token")) {
      this.$store.state.auth_flag = true;
    } else {
      this.$store.state.auth_flag = false;
    }
  },
  methods: {
    logout() {
      sessionStorage.setItem("auth_token", "");
      sessionStorage.setItem("login_user", {});
      alert("로그아웃 되었습니다!");
      this.$router.push("/");
      this.$store.state.auth_flag = false;
    },
    goMain() {
      this.$router.push("/");
    },
    goFoodList() {
      this.$router.push({ name: "foodList" });
    },
    goNotice() {
      this.$router.push({ name: "noticeList" });
    },
    goWeekMenu() {
      this.$router.push({ name: "weekMenu" });
    }
  }
};
</script>

<style>
.site-logo {
  width: 200px;
}
._header {
  height: 200px;
}
.top-nav-button {
  margin-right: 10px;
}
#img-200 {
  width: 200px;
}
</style>