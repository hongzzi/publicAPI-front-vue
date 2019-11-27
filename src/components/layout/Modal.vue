<template>
  <div>
    <b-modal hide-header hide-footer id="login-regist-modal" ref="login-regist-modal">
      <div>
        <b-tabs content-class="mt-2" justified>
          <b-tab title="Login" active>
            <div class="modal-contents" id="login-contents">
              <form action="#">
                <b-form-group
                  id="login-form"
                  label-cols-sm="3"
                  label-cols-lg="3"
                  label="email ID"
                  label-for="input-login-email"
                >
                  <b-form-input
                    ref="focusThis"
                    v-model="email"
                    id="input-login-id"
                    placeholder="example@yourmail.com"
                    style="{font-size: 5px;}"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="login-form"
                  label-cols-sm="3"
                  label-cols-lg="3"
                  label="password"
                  label-for="input-login-pw"
                >
                  <b-form-input
                    v-model="password"
                    type="password"
                    id="input-login-pw"
                    @keyup.enter="login"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-row align="end">
                  <b-col cols="6" align-self="start">
                    <a href>아이디/비밀번호찾기</a>
                  </b-col>
                  <b-col>
                    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember ID</b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row></b-row>
                <b-row align="end" class="confirm-button">
                  <b-col align-self="end">
                    <b-button variant="primary" @click="login">로그인</b-button>
                  </b-col>
                </b-row>
              </form>
            </div>
          </b-tab>
          <b-tab title="Regist">
            <div class="modal-contents" id="tab-contents">
              <div class="tab-pane fade show active" id="#regist-contents">
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
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="regist-form"
                  label-cols-sm="3"
                  label-cols-lg="3"
                  label="password"
                  label-for="input-regist-pw"
                >
                  <b-form-input
                    type="password"
                    id="input-regist-pw"
                    v-model="user.password"
                    required
                  ></b-form-input>
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
                    <b-button variant="primary" @click="regist">회원가입</b-button>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Constant from "../../vuex/constant";
import router from "../../router/router";
import Axios from "../../js/http-commons";

export default {
  router,
  data() {
    return {
      user: {},
      email: "",
      password: "",
      dump: [],
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" }
      ]
    };
  },
  methods: {
    login() {
      if (!this.email) {
        alert("이메일 아이디를 입력해주세요!");
      } else if (!this.password) {
        alert("비밀번호를 입력해주세요!");
      } else {
        Axios.post("/api/auth/signin", {
          email: this.email,
          passWord: this.password
        })
          .then(res => {
            if (res.data.status) {
              sessionStorage.setItem(
                "auth_token",
                res.headers["jwt-auth-token"]
              );
              sessionStorage.setItem(
                "login_user",
                JSON.stringify(res.data.data.data)
              );
              alert("로그인을 성공했습니다!");
              this.$store.state.auth_flag = true;
              window.location.reload();
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
      // this.$store
      //   .dispatch(Constant.LOG_IN, {
      //     email: this.email,
      //     password: this.password
      //   })
      //   .then(() => {
      //     if (this.$store.checkout) {
      //       alert(
      //         sessionStorage.getItem("login_user").email + "님 반갑습니다."
      //       );
      //       this.$refs["login-regist-modal"].hide();
      //       this.$store.checkout = false;
      //     } else {
      //       alert("로그인을 실패했습니다. 다시 시도해주세요.");
      //     }
      //   });
    },
    regist() {
      let allergyStr = "";
      this.dump.forEach((element, index) => {
        allergyStr += element + (this.dump.length - 1 == index ? "" : ",");
      });
      this.user.allergy = allergyStr;
      this.$store.dispatch(Constant.REGIST, { user: this.user });
      if (this.$store.checkout) {
        this.$refs["login-regist-modal"].hide();
      } else {
        alert("회원가입을 실패했습니다. 다시 시도해주세요.");
      }
    }
  }
};
</script>

<style scoped>
.modal-contents {
  padding-top: 20px;
  margin: 20px;
}
.confirm-button {
  padding-top: 20px;
}
</style>