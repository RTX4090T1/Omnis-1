<template>
    <div class="mainBackColor text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div class="login-container p-5 rounded shadow-lg bg-primary text-center">
        <h2 class="mb-4">Registration</h2>
        
        
        <form @submit.prevent="loginWithEmail" class="text-start">
            <div class="mb-3">
            <label for="name" class="form-label">Email</label>
            <input 
              type="text" 
              v-model="name" 
              id="name" 
              placeholder="Create username" 
              class="form-control bg-transparent text-white border-secondary" 
            />
          </div>

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
          
          <button type="submit" class="btn btn-light w-100 mb-3">Create account</button>
        </form>
  
        <hr class="text-white" />
  
        <button @click="loginWithGoogle" class="btn btn-outline-light w-100">
          <i class="bi bi-google me-2"></i> Login with Google
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: "RegComponent",
    data() {
      return {
        name:"",
        email: "",
        password: "",
        error:null
      };
    },
    computed:{
        ...mapGetters('auth',['getError'])
    },
    methods: {
    ...mapActions('auth', ['loginWithGoogle', 'createNewUser']),
    async loginWithEmail() {
    try {

        await this.createNewUser({ email: this.email, password: this.password, name: this.name });
    
        if (!this.getError) {
            this.$router.push('/');  
        } else {
            this.error = "An error occurred during registration.";
        }

    } catch (error) {
        console.error('Registration failed:', error);
        this.error = error.message || "A error occured while registration.";
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