import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const moment = require("moment-jalaali");
moment().format("jYYYY/jM/jD");

//shamsi Date
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const date = `${year}/${month}/${day}`;
export const shamsiDate = moment(date, "YYYY/MM/DD").format("jYYYY/jMM/jDD");
export const shamsiYear = moment(date, "YYYY/MM/DD").format("jYYYY");
export const shamsiMonth = moment(date, "YYYY/MM/DD").format("jMM");
export const shamsiDay = moment(date, "YYYY/MM/DD").format("jDD");

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
