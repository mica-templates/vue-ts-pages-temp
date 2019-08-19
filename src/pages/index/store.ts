import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// console.log(rootStore);
export default new Vuex.Store({
  state: {
    a: '111',
  },
  mutations: {
    del(state) {
      state.a = '555';
    },
  },
  actions: {},
});
