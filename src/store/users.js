import DBoperations from './helpers/DBoperations'
const collectionDb = new DBoperations('users')

export default{
    state(){
        return{
            permission:null,
            error:null,
            loading:false 
        }
    },
    getters:{
        getPermission(state){
            return state.permission
        },
        getLoading(state){
            return state.loading
        },
        getError(state){
            return state.error
        }
    },
    mutations:{
        setPermission(state, uPermission){
            state.permission = uPermission
        },
        setError(state, error){
            state.error = error
        },
        setLoading(state, load){
            state.loading = load
        }
    },
    actions:{
        loadUserPermissions({commit,rootGetters},userId){
            userId ??= rootGetters['bar/someGetter'].getUser.userId
            collectionDb.getItembyId(userId)
            .then((permission) => {commit('setPermission',permission)})
            .catch((error)=>{commit('setError',error)})
            .finally(()=>{commit('setLoading',false)})
        },
        clearPermissions({ commit }) {
            commit('setPermission', {})
        },
    }
}