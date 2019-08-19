import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import rootStore, { IRootState } from '@/store';
// import { Store } from 'vuex';

// 全局资源
import '@/global';

Vue.config.productionTip = false;

// Vue.prototype.$rootStore = rootStore;
// Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
