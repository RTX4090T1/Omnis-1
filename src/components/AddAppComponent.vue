<template>
    <div class="mainBackColor text-white min-vh-100">
      <header class="mainheader">
        <div class="container d-flex justify-content-center align-items-center" style="height: 50px;">
          <h1 class="text-white me-3">Publish ad</h1>
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
                <li>
                  <a class="dropdown-item" href="#">
                    <router-link to="/">Home</router-link>
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </header>
  
      <div class="container mt-5">

        <form @submit.prevent="publishProduct" class="card p-4 shadow-sm">
          <div class="mb-3">
            <label for="productName" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="productName" v-model="ad.productName" required />
          </div>
  
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price" v-model="ad.price" required />
          </div>
  
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="ad.description" required></textarea>
          </div>

          <div class="mb-3">
            <label for="pnumber" class="form-label">Use your phone number or email to contact with clients</label>
            <input type="text" class="form-control" id="pnumber" v-model="ad.phoneNumber" required />
          </div>

          <div class="mb-3">
            <label for="images" class="form-label">Upload Images (1-8 images)</label>
            <input type="file" class="form-control" id="images" @change="handleImageUpload" multiple accept="image/*" />
          </div>
  
          <div v-if="ad.images.length > 0" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(image, index) in ad.images"
                :key="index"
                :class="{'active': index === 0}">
                <img :src="image" class="d-block w-100" alt="Product Image">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
  
          <button type="submit" class="btn btn-primary mt-3 w-100">Publish</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import { mapGetters,mapActions } from 'vuex';

export default {
  name: "AddAppComponent",
  data() {
    return {
      ad: {
        productName: "",
        price: "",
        description: "",
        images: [], 
        phoneNumber:"",
      },
    };
  },
  computed:{
    ...mapGetters('auth',['getUserName'])
  },
  methods: {
    ...mapActions('todoItems',['addItem']),
    handleImageUpload(event) {
       const files = event.target.files;
        const validFiles = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.startsWith("image/") && this.ad.images.length < 8) {
            validFiles.push(URL.createObjectURL(files[i])); 
          }
        }
        this.ad.images = validFiles; 
    },
    publishProduct() {
      this.addItem({
        item: {
          productName: this.ad.productName,
          price: this.ad.price,
          description: this.ad.description,
          phoneNumber:this.ad.phoneNumber,
          publisher:this.getUserName
        },
        images: this.ad.images, 
      });
    },
  },
};
</script>
  
  <style scoped>
  .mainheader {
    background-color: rgb(46, 82, 124);
    padding: 20px;
  }
  
  .mainBackColor {
    background-color: azure;
  }
  
  form {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  button {
    width: 100%;
  }
  
  .carousel-inner img {
    max-height: 300px;
    object-fit: cover;
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 5%;
  }
  
  .carousel-control-prev {
    left: 0;
  }
  
  .carousel-control-next {
    right: 0;
  }
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: rgba(0, 0, 0, 0.5); 
  }
  
  .card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  
  .form-control {
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  </style>
  