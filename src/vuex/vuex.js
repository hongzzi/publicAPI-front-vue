import Vue from 'vue';
import Vuex from 'vuex';
import Constant from './constant';
import Axios from '../js/http-commons';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    auth_flag: false,
    loading: false,
    error: null,
    checkout: false
  },
  mutations: {
    [Constant.AUTH_TOKEN](state, payload) {
      state.auth_token = payload.auth_token;
    },
    [Constant.LOADING](state, payload) {
      //{loading : loading 값}
      state.loading = payload.loading;
    },
    [Constant.ERROR](state, payload) {
      //{error : error 객체}
      state.error = payload.error;
    },
    [Constant.FLAG](state, payload) {
      //{error : error 객체}
      state.auth_flag = payload.auth_flag;
    },
    [Constant.CHECKOUT_SUCCESS](state) {
      state.checkout = true;
    },
    [Constant.CHECKOUT_FAIL](state) {
      state.checkout = false;
    }
  },
  actions: {
    [Constant.LOG_IN](store, payload) {
      store.commit(Constant.LOADING, {
        loading: true
      });
      Axios.post('/auth/signin', {
        email: payload.email,
        passWord: payload.password
      })
        .then(res => {
          if (res.data.status) {
            sessionStorage.setItem('auth_token', res.data.data.auth_token);
            sessionStorage.setItem('login_user', res.data.data.data);
            store.commit(Constant.CHECKOUT_SUCCESS);
            store.commit(Constant.FLAG, {
              auth_flag: true
            });
          }
        })
        .catch(e => {
          // console.log(e);
          store.commit(Constant.ERROR, {
            error: e
          });
        })
        .finally(() => {
          store.commit(Constant.LOADING, {
            loading: false
          });
        });
    },
    [Constant.REGIST](store, payload) {
      store.commit(Constant.LOADING, {
        loading: true
      });
      Axios.post('/auth/signup', {
        email: payload.user.email,
        passWord: payload.user.password,
        name: payload.user.name,
        allergy: payload.user.allergy
      })
        .then(() => {})
        .catch(e => {
          // console.log(e);
          store.commit(Constant.ERROR, {
            error: e
          });
        })
        .finally(() => {
          store.commit(Constant.LOADING, {
            loading: false
          });
        });
    }
  }
});

export default store;
