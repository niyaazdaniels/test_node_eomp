<template>
    <div>
      <h1>Products</h1>
        <form class="d-flex lg-2 searchBTN" role="search">
            <input class="form-control" type="search" id="search" placeholder="Search" aria-label="Search" v-model="searchProducts" />
        </form>
      <div class="sort-dropdown">
        <label for="sort" id="sortTitle">Sort by: </label>
        <select id="sort" v-model="sortBy">
          <option value="default">Default</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
        <button class="btn" @click="sortToggle">
          {{ sort === 'asc' ? 'Ascending' : 'Descending' }}
        </button>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 flex" v-if="products">
        <div class="col flex" v-for="product in filteredProducts" :key="product">
          <div class="card flex" id="test">
            <center>
              <img :src="product.prodUrl" class="card-img-top img-fluid" id="image" loading="lazy"
                :alt="product.prodName" />
            </center>
            <div class="card-body">
              <div class="title">
                <h5 class="card-title">{{ product.prodName }}</h5>
              </div>
              <div class="category">
                <p class="card-text">Category: {{ product.Category }}</p>
              </div>
              <div class="amount">
                <p class="card-text">Price: R{{ product.amount }}</p>
              </div>
              <div class="button">
                <button @click="viewProduct(product.prodID)" class="btn">View More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <Spinner />
      </div>
    </div>
  </template>
  
  <script>
  import Spinner from "../components/SpinnerComp.vue";
  export default {
    components: {
      Spinner,
    },
    computed: {
      products() {
        return this.$store.state.products;
      },
      filteredProducts() {
        let filter = this.products
        if(this.searchProducts !== ''){
          filter = filter.filter(product => product.prodName.toLowerCase().includes(this.searchProducts.toLowerCase()) || 
          product.Category.toLowerCase().includes(this.searchProducts.toLowerCase()))
        }
        if(this.sortBy === 'price'){
          filter = filter.sort((a, b)=> (this.sort === 'asc' ? a.price - b.price : b.price - a.price))
        } else if(this.sortBy === 'Category'){
          filter = filter.sort((a, b)=> a.Category.localeCompare(b.Category) * (this.sort === 'asc' ? 1 : -1))
        } else if(this.sortBy === 'alphabetical'){
          filter = filter.sort((a, b)=> a.prodName.localeCompare(b.prodName) * (this.sort === 'asc' ? 1 : -1))
        }
        return filter
      },
    },
    mounted() {
      this.$store.dispatch("fetchProducts");
    },
    methods: {
      searchProducts(e) {
        e.preventDefault()
        this.searchProducts = this.searchProducts.trim()
      },
      sortToggle() {
        this.sort = this.sort === 'asc' ? 'desc' : 'asc'
      },
      resetSearch() {
        this.searchProducts = ''
      },
      viewProduct(prodID) {
        const selectedItem = this.products.find(
          (product) => product.prodID === prodID
        );
        this.$store.commit("setSelectedProduct", selectedItem);
        this.$router.push({ name: "ProductsView", params: { prodID: prodID }});
      }
    },
    data() {
      return {
        searchProducts: '',
        sortBy: "",
        sort: ""
      }
    }
  };
  </script>
  
  <style scoped>
  #sortTitle{
    font-size:18px;
    margin-right: 1.5rem;
  }
  
  
  #sort{
    margin-top: 2rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
    width: 10rem;
    height: 2rem;
    outline: none;
    transition: ease-in-out 1s;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .searchBTN{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #image {
    aspect-ratio: 1/1;
    width: 15rem;
    height: auto;
    margin-top: .5rem;
  }
  
  #search{
    width: 15rem;
    display: flex !important;
    justify-content: center !important;
  }
  
  .btn {
    border: 2px solid #f7f4f1;
    background-color: #2b821d;
    color: white;
  }
  
  .btn:hover {
    background-color: black;
    color: white;
  }
  
  .card {
    margin-bottom: 2rem;
    width: 65% !important;
  }  
  .category {
    height: 10%;
  }
  
  
  
  .quantity {
    height: 10%;
    margin-top: .1rem;
    margin-bottom: .8rem;
  }
  
  .card-text {
    height: 50px;
    overflow: auto;
  }
  
  .title {
    height: 15%;
  }
  
  .button {
    height: 10%;
  }
  
  .row {
    --bs-gutter-x: 0;
    display: flex !important;
    justify-content: space-between !important;
  }
  
  @media screen and (max-width:300px) {
    .card {
      width: 295px !important;
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  
    .searchBTN {
      width: 290px !important;
    }
  
    .row {
      --bs-gutter-x: 0;
    }
  }
  
  @media screen and (max-width:700px) {
    .searchBTN {
      width: 690px;
    }
  
    #image {
      width: 15rem;
    }
  
    .quantity {
      margin-top: .1rem;
      margin-bottom: .5rem;
    }
  
    .card {
      width: 600px;
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  
    .row {
      --bs-gutter-x: 0;
    }
  }
  
  @media screen and (min-width: 1592px) {
    .card {
      width: 1591px;
    }
  
  }
  </style>