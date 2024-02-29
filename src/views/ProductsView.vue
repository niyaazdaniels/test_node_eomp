<template>
  
  <!-- This section represents the visual layout of the Products page -->
  <div>
    <!-- Heading for the Products page -->
    <h1>Products</h1>
    <!-- Search form for filtering products -->
    <form class="d-flex lg-2 searchBTN" role="search">
      <!-- Input field for searching products -->
      <input class="form-control" type="search" id="search" placeholder="Search" aria-label="Search" v-model="searchDBProducts" />
    </form>
    <!-- Dropdown for sorting products -->
    <div class="sort-dropdown">
      <!-- Label for the sort dropdown -->
      <label for="sort" id="sortTitle">Sort by: </label>
      <!-- Dropdown select for sorting options -->
      <select id="sort" v-model="sortBy">
        <option value="default">Default</option>
        <option value="amount">Price</option>
        <option value="Category">Category</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <!-- Button for toggling sorting order -->
      <button class="btn" @click="sortToggle">
        <!-- Text indicating current sorting order -->
        {{ sort === 'asc' ? 'Ascending' : 'Descending' }}
      </button>
    </div>
    <!-- Displaying products in a grid layout -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 flex" v-if="products">
      <!-- Iterating over filtered products -->
      <div class="col flex" v-for="product in filterDBProducts" :key="product">
        <!-- Individual product card -->
        <div class="card flex" id="test">
          <center>
            <!-- Product image -->
            <img :src="product.prodUrl" class="card-img-top img-fluid" id="image" loading="lazy" :alt="product.prodName" />
          </center>
          <!-- Product details -->
          <div class="card-body">
            <!-- Product name -->
            <div class="title">
              <h5 class="card-title">{{ product.prodName }}</h5>
            </div>
            <!-- Product category -->
            <div class="category">
              <p class="card-text">Category: {{ product.Category }}</p>
            </div>
            <!-- Product price -->
            <div class="amount">
              <p class="card-text">Price: R{{ product.amount }}</p>
            </div>
            <!-- Button to view more details -->
            <div class="button">
              <button @click="displayProduct(product.prodID)" class="btn">View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Placeholder for Spinner component while loading products -->
    <div class="row" v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
// Importing external Spinner component
import Spinner from "../components/SpinnerComp.vue";
export default {
  // Registering external components used in the template
  components: {
    Spinner,
  },
  // Computed properties for dynamic data manipulation
  computed: {
    // Getter for products data from Vuex store
    products() {
      return this.$store.state.products;
    },
    // Filtering and sorting products based on search and sort criteria
    filterDBProducts() {
      let filter = this.products
      // Filtering based on search query
      if(this.searchDBProducts !== ''){
        // Check if the product name or category matches the search query 
        filter = filter.filter(product => product.prodName.toLowerCase().includes(this.searchDBProducts.toLowerCase()) || 
        product.Category.toLowerCase().includes(this.searchDBProducts.toLowerCase()))
      }
     // Sorting based on the selected sort option
return filter.sort((a, b) => {
  // Check the selected sorting option
  if (this.sortBy === 'amount') {
    // Sort by amount
    return (this.sort === 'asc' ? a.amount - b.amount : b.amount - a.amount);
  } else if (this.sortBy === 'Category') {
    // Sort by category
    return a.Category.localeCompare(b.Category) * (this.sort === 'asc' ? 1 : -1);
  } else if (this.sortBy === 'alphabetical') {
    // Sort alphabetically
    return a.prodName.localeCompare(b.prodName) * (this.sort === 'asc' ? 1 : -1);
  }
  // If no valid sorting option is provided, return the unsorted filter array
  return filter;
});

    },
  },
  // Lifecycle hook executed when component is mounted
  mounted() {
    // Dispatching action to fetch products from Vuex store
    this.$store.dispatch("fetchProducts");
  },
  // Methods for handling user interactions and data manipulation
  methods: {
   // Function to handle search input
searchDBProducts(e) {
  // Prevent the default behavior of the event (e.g., form submission)
  e.preventDefault();
  // Trim any whitespace from the search query
  this.searchDBProducts = this.searchDBProducts.trim();
},
    // Function to toggle sorting order
   // Function to toggle the sorting order
sortToggle() {
  // Toggle between ascending and descending sort orders
  this.sort = this.sort === 'asc' ? 'desc' : 'asc';
},
    // Function to reset search input
    resetSearchTab() {
      this.searchDBProducts = ''
    },
    // Function to display individual product details in a component 
    displayProduct(prodID) {
      const selectedItem = this.products.find(
        (product) => product.prodID === prodID
      );
      // Committing selected item data to Vuex store
      this.$store.commit("setSelectedProduct", selectedItem);
      // Navigating to product details view
      this.$router.push({ name: "ProductsView", params: { prodID: prodID }});
    }
  },
  // Data properties for storing component state
  data() {
    return {
      searchDBProducts: '', // Search query
      sortBy: "", // Sort option
      sort: "" // Sort order
    }
  }
};
</script>

<style scoped>
/* Styling specific to this component */

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
/* Media queries for responsive design */

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
