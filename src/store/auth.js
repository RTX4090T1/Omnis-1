import { auth } from "@/firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";

export default {
  namespaced: true,
  state() {
    return {
      activeUser: null,
      error: null,
      loading: false,
    };
  },
  getters: {
    getUser(state) {
      return state.activeUser;
    },
    getError(state) {
      return state.error;
    },
    getUserName(state) {
      return state.activeUser ? state.activeUser.displayName : 'Guest'; 
    },
    getUserEmail(state) {
      return state.activeUser ? state.activeUser.email : null; 
    },
  },
  mutations: {
    setUser(state, user) {
      state.activeUser = user;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    initializeAuth({ commit }) {
      setPersistence(auth, browserLocalPersistence).then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            commit('setUser', user); 
          } else {
            commit('setUser', null); 
          }
        });
      }).catch((error) => {
        commit('setError', error.message);
      });
    },

    async saveLoginDataToUser({ commit, dispatch }, loginData) {
      const user = loginData.user;
      commit('setUser', user);
      dispatch('saveToLocalStorage', loginData);
    },

    async saveToLocalStorage(loginData) {
      const credentials = GoogleAuthProvider.credentialFromResult(loginData);
      if (credentials) {
        localStorage.setItem('cred', JSON.stringify(credentials));
      }
    },

    async loginWithGoogle({ commit, dispatch }) {
      const provider = new GoogleAuthProvider();
      try {
        const loginData = await signInWithPopup(auth, provider);
        dispatch('saveLoginDataToUser', loginData);
      } catch (error) {
        commit('setError', error.message);
      }
    },

    async loginWithEmail({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        commit('setUser', userCredential.user);
        commit('setError', null);
      } catch (error) {
        commit('setError', error.message);
      }
    },

    async createNewUser({ commit }, { email, password, name }) {
        const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name
        });
        commit('setUser', userCredential.user);
        commit('setError', null);
        return userCredential;
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },

    logout({ commit }) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem('cred');
          commit('setUser', null);
        })
        .catch((error) => {
          commit('setError', error.message);
        });
    },
  }
};
