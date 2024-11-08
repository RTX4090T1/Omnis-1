import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegComponent from "@/components/RegComponent.vue";
import store from '@/store'
import AccauntComponent from "@/components/AccauntComponent.vue";
import AddAppComponent from "@/components/AddAppComponent.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path:"/login",
    name:"login",
    component:LoginComponent
  },
  {
    path:"/register",
    name:"register",
    component:RegComponent
  },
  {
    path:"/account",
    name:"account",
    component:AccauntComponent
  },
  {
    path:"/addApplication",
    name:"addApplication",
    component:AddAppComponent
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes,
});

router.beforeEach(async(to)=>{if(to.meta?.requiedAuth)
  {
    var isAuth = store.state.auth.user
    if(!isAuth) isAuth = await store.dispatch('auth/logInWithCredentials')
      if(!isAuth){
        return{
          name:"login"
        }
      }
  }
})
export default router;
