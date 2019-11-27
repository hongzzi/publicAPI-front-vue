import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import router from './router/router';
import store from './vuex/vuex';

import Datepicker from 'vuejs-datepicker';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = true;
Vue.use(Datepicker);
Vue.use(VueApexCharts);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.component('datepicker', Datepicker);
Vue.component('apexchart', VueApexCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
