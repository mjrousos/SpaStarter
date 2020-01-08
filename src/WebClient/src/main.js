import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap";
import "./styles/style.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    // Populate initial user info from MSAL
    store.dispatch("refreshUser");
  },
  render: h => h(App)
}).$mount("#app");
