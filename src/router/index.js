import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Attractions from "../views/Attractions.vue";
import Food from "../views/Food.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/atractivos",
    name: "Attractions",
    component: Attractions,
  },
  {
    path: "/comida",
    name: "Food",
    component: Food,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
