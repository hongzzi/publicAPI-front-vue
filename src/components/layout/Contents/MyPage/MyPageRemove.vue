<template>
  <div>
    <b-card bg-variant="light" text-variant title="회원 탈퇴">
      <b-card-text>회원정보를 삭제하실 경우 등록된 섭취정보까지 사라집니다. 진행하시겠습니까?</b-card-text>
      <b-button variant="outline-danger" @click="remove">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("login_user"));
    console.log(this.user);
  },
  methods: {
    remove() {
      axios
        .delete("http://localhost:8197/user/remove", {
          params: {
            email: this.user.email
          },
          headers: {
            "jwt-auth-token": sessionStorage.getItem("auth_token")
          }
        })
        .then(res => {
          alert(res + "탈퇴를 성공했습니다.");
          sessionStorage.setItem("auth_token", "");
          sessionStorage.setItem("login_user", {});
          this.$router.push("/");
          this.$store.state.auth_flag = false;
        })
        .catch(error => {
          alert(error + "탈퇴에 실패했습니다.");
        });
    }
  }
};
</script>

<style>
</style>