import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:page?",
    name: "UsersList",
    component: () =>
      import(/* webpackChunkName: "UsersList" */ "@/views/UsersList.vue")
  },
  {
    path: "/todo/:userId",
    name: "UserToDoPage",
    component: () =>
      import(/* webpackChunkName: "UserToDoPage" */ "@/views/UserToDoPage.vue")
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
