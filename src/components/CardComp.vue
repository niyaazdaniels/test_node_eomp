<template>
    <center>
    <div class="card" id="card">
      <div v-if="product">
        <h1>{{ product.prodName }}</h1>
        <div><img :src="product.prodUrl" :alt="product.prodName" loading="lazy" class="img-fluid" id="image"/>
          <p>Category: {{ product.Category }}</p>
          <div id="quantity">Quantity: {{ product.quantity }}</div>
          <p>Price: R{{ product.amount }}</p>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
    </center>
  </template>
  
  <script>
  import Spinner from "@/components/SpinnerComp.vue";
  export default {
    components: {
      Spinner,
    },
    computed: {
      product() {
        return this.$store.state.selectedProduct;
      },
    },
  };
  </script>
  
  <style scoped>
  #image{
    width: 20rem;
    margin-bottom: 3rem;
  }
  
  #card{
    margin-top: 2rem;
    width: fit-content;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  h1{
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  
  #description{
    margin-bottom: 2rem;
    width: 30rem;
  }
  
  </style>
  