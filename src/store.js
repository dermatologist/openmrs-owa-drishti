import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

      shimmerId: ''
  },
  mutations: {
      setShimmerId(state, id) {
          state.shimmerId = id;
      },
      clearShimmerId(state) {
          state.shimmerId = '';
      }

  },
  actions: {

  },
  getters: {
      shimmer: state => state.shimmerId
  },
});
