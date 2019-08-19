import Vue from 'vue';
import Components from '@/components';
import rootStore, { IRootState } from '@/store';
import { Store } from 'vuex';

// 公用全局本地 svg icon
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const req = require.context('@/assets/icon/svg', true, /\.svg$/);
requireAll(req);

// 公用全局组件
Vue.use(Components);

// 公用全局filters
import * as filters from '@/filters';
Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, (filters as any)[key]);
});

// 全局store
declare module 'vue/types/vue' {
  interface Vue {
    $eventBus: any;
    $rootStore: Store<IRootState>;
    $ref: any;
  }
}

Vue.prototype.$rootStore = rootStore;
Vue.prototype.$eventBus = new Vue();
