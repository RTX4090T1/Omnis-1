<template>
    <div class="main-back-color min-vh-100 d-flex justify-content-center align-items-center">
      
      <div class="card p-5 rounded shadow-lg text-center" style="width: 480px; height: 700px; background-color: white;">

        <div class="profile-section mb-4">
          <div class="bg-danger rounded-circle mx-auto d-flex align-items-center justify-content-center" style="width: 140px; height: 140px;">
            <img src="https://via.placeholder.com/140" alt="Profile Picture" class="rounded-circle img-fluid" />
          </div>
          <p class="mt-3 text-muted">Change Picture</p>
        </div>
  
   
        <div class="user-info mb-5">
          <p class="fw-bold fs-4">{{ getUserName || 'Guest' }}</p>
          <p class="text-muted fw-bold fs-5">{{ getUserEmail || 'Not Logged In' }}</p>
        </div>
  

        <div class="list-group list-group-flush mb-4">
          <router-link class="list-group-item list-group-item-action text-center text-dark fs-5" to="/myApplications">
            <i class="bi bi-folder me-2"></i> My Applications
          </router-link>
          <router-link class="list-group-item list-group-item-action text-center text-dark fs-5" to="/myOrders">
            <i class="bi bi-cart me-2"></i> My Orders
          </router-link>
          <router-link class="list-group-item list-group-item-action text-center text-dark fs-5" to="/mySales">
            <i class="bi bi-bar-chart me-2"></i> My Sales
          </router-link>
          <router-link class="list-group-item list-group-item-action text-center text-dark fs-5" to="/addApplication">
            <i class="bi bi-bar-chart me-2"></i> Publish new ad
          </router-link>
        </div>
  

        <button @click="signOut" class="btn btn-dark fw-bold fs-5 w-100">
          <i class="bi bi-box-arrow-right me-2"></i> Sign Out
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    name: "AccountComponent",
    computed: {
      ...mapGetters('auth', ['getUserName', 'getUserEmail'])
    },
    methods: {
      signOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>

  .main-back-color {
    background-color: azure;
  }
  

  .profile-section .bg-danger {
    background-color: #F9A3A3 !important; 
  }
  
  
  @media (max-width: 767px) {
    .card {
      width: 90%;
      height: auto;
    }
  }
  </style>
  