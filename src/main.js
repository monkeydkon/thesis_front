import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(Vuelidate)

if (store.getters.isLoggedIn) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.auth.jwt}`;
  // setTimeout(() => {
  //   store.dispatch('refresh')
  // },2000)
}


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // store.dispatch('logout')
      //   .then(() => {
      //     router.push({ path: "/login" });
      //   });
      // store.dispatch('refresh')
      //   .then()
      //   .catch(() => {
      store.dispatch('logout')
        .then(() => {
          router.push({ path: "/login" });
        })
        .catch(() => {
          router.push({ path: "/login" });
        });
      // })
    }
    throw error;
  }
);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
