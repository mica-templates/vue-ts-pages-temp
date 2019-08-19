import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';
// import user from './modules/user';

Vue.use(Vuex);

export interface IRootState {
  b: number;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  state: {
    b: 0,
  },
  mutations: {
    add(state, n) {
      state.b = state.b + n;
    },
  },
  plugins: [persistedState({ storage: window.sessionStorage })],
});
