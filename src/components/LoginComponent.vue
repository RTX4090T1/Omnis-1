<template>
  <div class="mainBackColor text-white min-vh-100 d-flex justify-content-center align-items-center">
    <div class="login-container p-5 rounded shadow-lg bg-primary text-center">
      <h2 class="mb-4">Login</h2>
      
      <form @submit.prevent="loginWithEmaill" class="text-start">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            v-model="email" 
            id="email" 
            placeholder="Enter your email" 
            class="form-control bg-transparent text-white border-secondary" 
          />
        </div>
        
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            placeholder="Enter your password" 
            class="form-control bg-transparent text-white border-secondary" 
          />
        </div>
        <span v-if="error">{{ error }}</span>
        
        <button type="submit" class="btn btn-light w-100 mb-3">Login</button>
      </form>

      <hr class="text-white" />

      <button @click="googleLogin" class="btn btn-outline-light w-100">
        <i class="bi bi-google me-2"></i> Login with Google
      </button>
      <router-link class="d-flex my-3 justify-content-center align-items-center" style="color:white" to="/register">Create new account</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase-config';

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  computed: {
    ...mapGetters('auth', ['getError'])
  },
  methods: {
    ...mapActions('auth', ['loginWithGoogle', 'loginWithEmail']),
    
    async loginWithEmaill() {
      try {
        await this.loginWithEmail({ email: this.email, password: this.password });
        if (!this.getError) {
          this.$router.push('/');   
        } else {
          this.error = "An error occurred while logging in.";
        }
      } catch (error) {
        console.error('Login failed:', error); 
      }
    },

    async googleLogin() {
      const provider = new GoogleAuthProvider();
      try {
        const loginData = await signInWithPopup(auth, provider);
        await this.$store.dispatch('auth/saveLoginDataToUser', loginData);
        this.$router.push('/'); 
      } catch (error) {
        this.error = "An error occurred while logging in with Google.";
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.mainBackColor {
  background-color: #2e527c;
}

.login-container {
  max-width: 400px;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-light {
  background-color: #ffffff;
  color: #2e527c;
}

.btn-outline-light {
  color: #ffffff;
  border-color: #ffffff;
}

.btn-outline-light:hover {
  background-color: #ffffff;
  color: #2e527c;
}
</style>
