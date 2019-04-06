import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import Control from "./components/Control";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
