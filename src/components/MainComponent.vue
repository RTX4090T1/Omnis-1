<template>
    <div class="mainBackColor text-white min-vh-100">
      <header class="mainheader">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
        <div class="container d-flex justify-content-center align-items-center" style="height: 50px;">
          <span class="ms-auto text-white position-absolute start-0 ms-5">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle bg-transparent" style="border-color: transparent"
                type="button" id="setting" data-bs-toggle="dropdown" aria-expanded="false">
                Options
              </button>
              <ul class="dropdown-menu" aria-labelledby="setting">
                <li v-if="getUserEmail">
                  <a class="dropdown-item" href="#">
                    <router-link to="/account">Account</router-link>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Support</a>
                </li>
                <li v-if="getUserEmail" @click="signOut">
                  <a class="dropdown-item" href="#">Sign Out</a>
                </li>
                <li v-if="!getUserEmail">
                  <a class="dropdown-item" href="#">
                    <router-link to="/login">Sign In / Log In</router-link>
                  </a>
                </li>
              </ul>
            </div>
          </span>
          <h1 class="text-white me-3">Omnis</h1>
          <span class="ms-auto text-white position-absolute end-0 me-5">
            <button class="btn btn-primary bg-transparent" style="border-color: transparent">
              <i class="bi bi-person-circle fs-4"></i>
              <figcaption>{{ getUserName || 'Guest' }}</figcaption>
            </button>
          </span>
        </div>
      </header>
      <div class="links d-flex justify-content-center align-items-center fw-bold">
        <div class="nav nav-tabs" id="nav-tab">
          <button class="nav-link bg-transparent" id="omnis" data-bs-toggle="tab" data-bs-target="#nav-omnis"
            type="button" aria-controls="nav-omnis">Omnis</button>
          <button class="nav-link bg-transparent" id="estate" data-bs-toggle="tab" data-bs-target="#nav-estate"
            type="button" aria-controls="nav-estate">Real Estate</button>
          <button class="nav-link bg-transparent" id="automobile" data-bs-toggle="tab" data-bs-target="#nav-automobile"
            type="button" aria-controls="nav-automobile">Automobile</button>
          <button class="nav-link bg-transparent" id="autoparts" data-bs-toggle="tab" data-bs-target="#nav-autoparts"
            type="button" aria-controls="nav-autoparts">Auto Parts</button>
          <button class="nav-link bg-transparent" id="home" data-bs-toggle="tab" data-bs-target="#nav-home" type="button"
            aria-controls="nav-home">Home & Garden</button>
          <button class="nav-link bg-transparent" id="electronics" data-bs-toggle="tab" data-bs-target="#nav-electronics"
            type="button" aria-controls="nav-electronics">Electronics</button>
          <button class="nav-link bg-transparent" id="baby" data-bs-toggle="tab" data-bs-target="#nav-baby" type="button"
            aria-controls="nav-baby">Baby & Kids</button>
          <button class="nav-link bg-transparent" id="education" data-bs-toggle="tab" data-bs-target="#nav-education"
            type="button" aria-controls="nav-education">Education</button>
          <button class="nav-link bg-transparent" id="sport" data-bs-toggle="tab" data-bs-target="#nav-sport"
            type="button" aria-controls="nav-sport">Sport</button>
          <button class="nav-link bg-transparent" id="clothing" data-bs-toggle="tab" data-bs-target="#nav-clothing"
            type="button" aria-controls="nav-clothing">Clothing</button>
          <button class="nav-link bg-transparent" id="hardware" data-bs-toggle="tab" data-bs-target="#nav-hardware"
            type="button" aria-controls="nav-hardware">Hardware</button>
          <button class="nav-link bg-transparent" id="services" data-bs-toggle="tab" data-bs-target="#nav-services"
            type="button" aria-controls="nav-services">Services</button>
          <button class="nav-link bg-transparent" id="trading" data-bs-toggle="tab" data-bs-target="#nav-trading"
            type="button" aria-controls="nav-trading">Trading</button>
        </div>
      </div>
  
      <div class="searchInput d-flex justify-content-center align-items-center py-3 position-relative">
        <h3 class=" ms-5 position-absolute start-0" style="color:rgb(46, 82, 124);">Options</h3>
        <form label-for="search" label="Find">
          <input type="text" id="search" v-model="searchString" placeholder="Omnis..."
            class="form-control bg-transparent border border-dark" style="border-width: 1px; width: 500px;">
        </form>
      </div>
  
      <div class="optionsContainer position-relative">
        <div class="container position-absolute start-0">
          <button class="btn btn-primary bg-transparent text-dark" style="border-color: transparent;" type="button"
            data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="category">
            Categories
          </button>
          <div class="collapse position-absolute" id="category" style="z-index: 1050;">
            <div class="card card-body overflow-auto locsb text-dark"
              style="height: 200px; width: 100px; border-color: transparent;">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <hr style="color:rgb(46, 82, 124); width: 100px;" class="ms-2 my-3">
        </div>
        <div class="container position-absolute start-0" style="top: 50px;">
          <button class="btn btn-primary bg-transparent text-dark" style="border-color: transparent;" type="button"
            data-bs-toggle="collapse" data-bs-target="#location" aria-expanded="false" aria-controls="location">
            Location
          </button>
          <div class="collapse position-absolute" id="location" style="z-index: 1050;">
            <div class="card card-body overflow-auto locsb text-dark"
              style="height: 200px; width: 100px; border-color: transparent;">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <hr style="color:rgb(46, 82, 124); width: 100px;" class="ms-2 my-3">
      </div>
  
      <div class="tab-content mt-3  d-flex justify-content-center text-dark fw-bold" id="nav-tabContent">
    <div class="tab-pane fade" id="nav-omnis" aria-labelledby="nav-omnis">omnis content</div>
    <div class="tab-pane fade" id="nav-estate" aria-labelledby="nav-estate">real estate content...</div>
    <div class="tab-pane fade" id="nav-automobile" aria-labelledby="nav-automobile">automobile content...</div>
    <div class="tab-pane fade" id="nav-autoparts" aria-labelledby="nav-autoparts">auto parts content...</div>
    <div class="tab-pane fade" id="nav-home" aria-labelledby="nav-home">home & garden content...</div>
    <div class="tab-pane fade" id="nav-electronics" aria-labelledby="nav-electronics">electronics content...</div>
    <div class="tab-pane fade" id="nav-baby" aria-labelledby="nav-baby">baby & kids content...</div>
    <div class="tab-pane fade" id="nav-education" aria-labelledby="nav-education">education content...</div>
    <div class="tab-pane fade" id="nav-sport" aria-labelledby="nav-sport">sport content...</div>
    <div class="tab-pane fade" id="nav-clothing" aria-labelledby="nav-clothing">clothing content...</div>
    <div class="tab-pane fade" id="nav-hardvare" aria-labelledby="nav-hardvare">hardware content...</div>
    <div class="tab-pane fade" id="nav-services" aria-labelledby="nav-services">services content...</div>
    <div class="tab-pane fade" id="nav-trading" aria-labelledby="nav-trading">trading content...</div>
  </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: "MainComponent",
    data() {
      return {
        searchString: "",
      };
    },
    computed: {
      ...mapGetters('auth', ['getUserName', 'getUserEmail', 'logout']),
    },
    methods: {
      signOut() {
        this.$store.dispatch('auth/logout');
      }
    }
  };
  </script>
  
  <style>
  .mainheader {
    background-color: rgb(46, 82, 124);
    padding: 20px;
  }
  
  .mainBackColor {
    background-color: azure;
  }
  
  .locsb::-webkit-scrollbar {
    width: 0;
  }
  
  .transparent-scrollbar {
    scrollbar-width: none;
  }
  </style>
  