import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_TOTAL_USERS_COUNT = "UPDATE_TOTAL_USERS_COUNT";

const storeOptions: StoreOptions<VuexState> = {
  state: {
    users: [],
    totalUsersCount: 0
  },
  mutations: {
    [UPDATE_USERS](state, { users }) {
      state.users = users;
    },
    [UPDATE_TOTAL_USERS_COUNT](state, { totalUsersCount }) {
      state.totalUsersCount = totalUsersCount;
    }
  }
};

export default new Vuex.Store(storeOptions);
