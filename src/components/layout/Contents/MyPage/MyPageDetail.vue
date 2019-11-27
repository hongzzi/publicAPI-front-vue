<template>
  <div class="user-form">
    <form action="#" ref="regist-form"></form>
    <b-form-group
      id="regist-form"
      label-cols-sm="3"
      label-cols-lg="3"
      label="email ID"
      label-for="input-regist-email"
    >
      <b-form-input
        id="input-regist-id"
        placeholder="example@yourmail.com"
        v-model="user.email"
        style="{font-size: 5px;}"
        disabled
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="regist-form"
      label-cols-sm="3"
      label-cols-lg="3"
      label="password"
      label-for="input-regist-pw"
    >
      <b-form-input type="password" id="input-regist-pw" v-model="user.password" required></b-form-input>
    </b-form-group>
    <b-form-group
      id="regist-form"
      label-cols-sm="3"
      label-cols-lg="3"
      label="password-confirm"
      label-for="input-regist-pw-confirm"
    >
      <b-form-input type="password" id="input-regist-pw-confirm" required></b-form-input>
    </b-form-group>
    <b-form-group
      id="regist-form"
      label-cols-sm="3"
      label-cols-lg="3"
      label="name"
      label-for="input-regist-name"
    >
      <b-form-input id="input-regist-name" v-model="user.name" required></b-form-input>
    </b-form-group>

    <b-form-group
      id="regist-form"
      label-cols-sm="3"
      label-cols-lg="3"
      label="allergy"
      label-for="input-regist-allergy"
    >
      <b-form-checkbox-group
        id="input-regist-alergy"
        v-model="dump"
        :options="options"
        name="allergy"
      ></b-form-checkbox-group>
    </b-form-group>
    <b-row align="end">
      <b-col>
        <b-button variant="primary" @click="update">회원정보 수정하기</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      dump: [],
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" }
      ]
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("login_user"));
    this.dump = this.user.allergy.split(",");
  },
  methods: {
    update() {
      axios
        .put(
          "http://localhost:8197/api/user",
          {
            email: this.user.email,
            passWord: this.user.password,
            name: this.user.name,
            allergy: this.user.allergy
          },
          {
            headers: {
              "jwt-auth-token": sessionStorage.getItem("auth_token")
            }
          }
        )
        .then(res => {
          if (res.data.status) {
            alert("성공적으로 수정되었습니다!");
          } else {
            alert("tlfvoㅣㅣㅏ");
          }
        })
        .catch(error => {
          alert("수정 중 오류가 발생했습니다.");
          console.log(sessionStorage.getItem("auth_token"));
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>