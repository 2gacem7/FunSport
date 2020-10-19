import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import MyProfile from "../views/MyProfile.vue";
import Dashboard from "../views/Dashboard.vue";
import ManageUsers from "../views/ManageUsers.vue";
import ManageCommentary from "../views/ManageCommentary.vue";
import ManageNews from "../views/ManageNews.vue";

import News from "../views/News.vue";
import DetailNews from "../views/DetailNews.vue";


import LOL from "../views/LOL.vue";
import CSGO from "../views/CSGO.vue";
import DOTA2 from "../views/DOTA2.vue";
import Football from "../views/Football.vue";
import DisplayMatchESport from "../views/DisplayMatchESport.vue";
import DisplayCompetitionESport from "../views/DisplayCompetitionESport.vue";

import DisplayMatchFootball from "../views/DisplayMatchFootball.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/myprofile",
    name: "MyProfile",
    component: MyProfile
  },
  {
    path: "/manageusers",
    name: "ManageUsers",
    component: ManageUsers
  },
  {
    path: "/managenews",
    name: "ManageNews",
    component: ManageNews
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/managecommentary",
    name: "ManageCommentary",
    component: ManageCommentary
  },
  {
    path: "/",
    name: "Home",
    component: CSGO
  },
  {
    path: "/csgo",
    name: "CSGO",
    component: CSGO
  },
  {
    path: "/lol",
    name: "LOL",
    component: LOL
  },
  {
    path: "/dota2",
    name: "DOTA2",
    component: DOTA2
  },
  {
    path: "/football",
    name: "FOOTBALL",
    component: Football
  },
  {
    path: "/news/:newsId",
    name: "detailNews",
    component: DetailNews
  },
  {
    path: "/:apiname/match/:matchId",
    name: "match",
    component: DisplayMatchESport
  },
  {
    path: "/:apiname/competition/:competitionId",
    name: "competition",
    component: DisplayCompetitionESport
  },
  {
    path: "/football/:matchId",
    name: "match",
    component: DisplayMatchFootball
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
