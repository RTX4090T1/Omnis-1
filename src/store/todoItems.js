import FDBOperation from './helpers/DBoperations'
const collectionDB = new FDBOperation('todo')
export default{
    namespaced:true,
    state:{
        itemList:[],
        loading:false,
        error:null
    },
    getters:{
        getProductList:(state)=>{state.productList},
        getLoading:(state)=>{state.loading},
        getError:(state)=>{state.error},
    },
    mutations:{
        setItem(state,objectLIST){
            state.products = objectLIST
        },
        setError(state,error){
            state.error = error
        },
        setLoading(state,load){
            state.loading = load
        }
    },
    actions: {
        loadList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .dbSnapshot()
                .then((list) => {
                    commit('setItem', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addItem({ commit, dispatch }, { item, images }) {
            commit('setError', null);
            commit('setLoading', true);
            collectionDB
              .dbAddItem(item, images)
              .then(() => {
                dispatch('loadList');
              })
              .catch((error) => {
                commit('setError', error);
              })
              .finally(() => {
                commit('setLoading', false);
              });
          },
        deleteItem({ commit, dispatch }, itemId) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .dbDeleteItem(itemId)
                .then(() => {
                    dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateItem({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .dbUpdate(itemId, data)
                .then(() => {
                    dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        dbLoadFromRequest({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    commit('setItem', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
    },
}

