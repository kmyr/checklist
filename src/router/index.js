import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index";
import tasks from "../views/tasks";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: index
  },
  {
    path: "/:task",
    name: "Tasks",
    component: tasks
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
