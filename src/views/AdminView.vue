<template>
  <!-- Main container -->
  <div>
    <!-- Section for Users -->
    <div>
      <!-- Title -->
      <h1>Users</h1>
      <!-- Component to add a new user -->
      <addUser />
      <!-- Responsive table for displaying users -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <!-- Table header -->
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email address</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.userID">
            <!-- Render user data if available -->
            <tr v-if="users">
              <!-- User details -->
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.userAge }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.userRole }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ user.userProfile }}</td>
              <!-- Buttons for updating and deleting user -->
              <td>
                <updateUser :user="user"/><button class="btn" @click="deleteUser(user.userID)">Delete</button>
              </td>
            </tr>
            <!-- Show spinner component if data is loading -->
            <tr v-else>
              <SpinnerComp />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Section for Products -->
    <div>
      <!-- Title -->
      <h1>Products</h1>
      <!-- Dropdown for sorting products -->
      <div class="sort-dropdown">
        <button class="btn" @click="toggleSortDirection">Filter by Name: {{ sort === "asc" ? "Ascending" : "Descending " }}</button>
        <button class="btn" @click="refresh">Refresh</button>
      </div>
      <!-- Component to add a new product -->
      <addProduct />
      <!-- Responsive table for displaying products -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <!-- Table header -->
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="product in filterDBProducts" :key="product.prodID">
            <!-- Render product data if available -->
            <tr v-if="products">
              <!-- Product details -->
              <td>{{ product.prodID }}</td>
              <td>{{ product.prodName }}</td>
              <td>{{ product.quantity }}</td>
              <td>R {{ product.amount }}</td>
              <td>{{ product.Category }}</td>
              <td><img :src="product.prodUrl" :alt="product.prodUrl" class="img-fluid image" loading="lazy"/></td>
              <!-- Buttons for updating and deleting product -->
              <td><updateProduct :product="product"/>
                <button @click="deleteProduct(product.prodID)" class="btn">Delete</button>
              </td>
            </tr>
            <!-- Show spinner component if data is loading -->
            <tr v-else>
              <SpinnerComp/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// Import necessary external components
import SpinnerComp from "../components/SpinnerComp.vue";
import addProduct from "../components/AddProduct.vue";
import addUser from "../components/AddUser.vue";
import updateProduct from "../components/UpdateProduct.vue";
import updateUser from "@/components/UpdateUser.vue";

export default {
  // Register external components
  components: {
    SpinnerComp,
    addProduct,
    addUser,
    updateProduct,
    updateUser,
  },
  // Data properties where keys are set to values
  data() {
    return {
      sort: "",
      sortBy: "id",
      sortMode: "prodID",
    };
  },
 // Computed properties for dynamic data retrieval and manipulation
computed: {
  // Retrieve users data from the store
  users() {
    // Return users data from Vuex store or an empty array if no data is available
    return this.$store.state.users || [];
  },
  // Retrieve products data from the store
  products() {
    // Return products data from Vuex store or an empty array if no data is available
    return this.$store.state.products || [];
  },
  // Calculate filtered products based on the selected sorting criteria
  filterDBProducts() {
    // Create a copy of the products array to avoid mutating the original data
    let filter = [...this.products];
    // Sort products based on the selected sorting criteria
    if (this.sortBy === "name") {
      // Sort products by name in ascending or descending order
      filter = filter.sort(
        (a, b) => a.prodName.localeCompare(b.prodName) * (this.sort === "asc" ? 1 : -1)
      );
    } else if (this.sortBy === "id") {
      // Sort products by ID in ascending or descending order
      filter = filter.sort(
        (a, b) => (this.sort === "asc" ? 1 : -1) * (a.prodID - b.prodID)
      );
    }
    // Return the filtered products based on sorting criteria
    return filter;
  },
  },
  // Lifecycle hook
  async mounted() {
    // Fetch products and users data from store
    await this.$store.dispatch("fetchProducts");
    await this.$store.dispatch("fetchUsers");
  },
  // Methods
  methods: {
    // Delete a product
    deleteProduct(prodID) {
      if (confirm("Are you sure you want to delete this product?")) { //method of confirm to whether the user wishes to delete the product
        this.$store.dispatch("deleteProduct", prodID);
        // Reload page after deletion
        setTimeout(() => {location.reload();
        }, 500);
      }
    },
    // Refresh products list
    refresh() {
      this.sortBy = "prodID";
    },
    // Toggle sort direction for products
    toggleSortDirection() {
      this.sortBy = 'name' 
      this.sort = this.sort === "asc" ? "desc" : "asc";
    },
    // Delete a user
    deleteUser(userID) {
      if (confirm("Are you sure you want to delete this user?")) { //method of confirming action with user
        this.$store.dispatch("deleteUser", userID);
        // Reload page after deletion
        setTimeout(() => {location.reload();
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
/* Styling for product images */
.image {
  width: 3rem;
}

/* Styling for sort dropdown */
.sort-dropdown{
  display: flex;
  justify-content: space-evenly;
}
/* General button styling */
.btn {
  border: 2px solid #f7f4f1;
  background-color: #717171;
  color: white;
  margin-bottom: 1rem;
}

/* Responsive styling for small screens */
@media screen and (max-width: 300px) {
  .table {
    width: 280px !important;
  }
}
</style>
