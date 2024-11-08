import { createStore } from "vuex";
import auth from './auth';
import todoItems from './todoItems'


export default createStore({
  state: {


  },
  getters: {

  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    todoItems
  },
});

