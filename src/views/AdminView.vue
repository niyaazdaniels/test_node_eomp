<template>
    <div>
      <h1>Users</h1>
      <addUser />
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.userID">
            <tr v-if="users">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.userAge }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.userRole }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>
                <updateUser :user="user"/><button class="btn" @click="deleteUser(user.userID)">Delete</button>
              </td>
            </tr>
            <tr v-else>
              <Spinner />
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Products</h1>
        <div class="sort-dropdown">
          <button class="btn" @click="toggleSortDirection">Filter by: {{ sort === "asc" ? "ascending" : "descending " }}</button>
          <button class="btn" @click="refresh">Refresh</button>
        </div>
        <addProduct />
        <div class="table-responsive">
          <table class="table">
            <thead>
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
            <tbody v-for="product in filteredProducts" :key="product.prodID">
              <tr v-if="products">
                <td>{{ product.prodID }}</td>
                <td>{{ product.prodName }}</td>
                <td>{{ product.quantity }}</td>
                <td>R {{ product.amount }}</td>
                <td>{{ product.Category }}</td>
                <td>
                    <img :src="product.prodUrl" :alt="product.prodUrl" class="img-fluid image" loading="lazy"/>
                </td>
                <td>
                  <updateProduct :product="product" />
                  <button @click="deleteProduct(product.prodID)" class="btn">Delete</button>
                </td>
              </tr>
              <tr v-else>
                <Spinner />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Spinner from "../components/SpinnerComp.vue";
  import addProduct from "../components/AddProduct.vue";
  import addUser from "../components/AddUser.vue";
  import updateProduct from "../components/UpdateProduct.vue";
  import updateUser from "@/components/UpdateUser.vue";
  export default {
    components: {
      Spinner,
      addProduct,
      addUser,
      updateProduct,
      updateUser,
    },
    data() {
      return {
        sort: "",
        sortBy: "id",
        sortMode: "prodID",
      };
    },
    computed: {
      users() {
        return this.$store.state.users || [];
      },
      products() {
        return this.$store.state.products || [];
      },
      product() {
        return this.$store.state.product || [];
      },
      user() {
        return this.$store.state.user || [];
      },
      filteredProducts() {
        let filtered = [...this.products];
        if (this.sortBy === "name") {
          filtered = filtered.sort(
            (a, b) => a.prodName.localeCompare(b.prodName) * (this.sort === "asc" ? 1 : -1)
          );
        } else if (this.sortBy === "id") {
          filtered = filtered.sort((a, b) => (this.sort === "asc" ? 1 : -1) * (a.prodID - b.prodID)
          );
        }
        return filtered;
      },
    },
    async mounted() {
      await this.$store.dispatch("fetchProducts");
      await this.$store.dispatch("fetchUsers");
    },
    methods: {
      deleteProduct(prodID) {
        if (confirm("Are you sure you want to delete this product?")) {
          this.$store.dispatch("deleteProduct", prodID);
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      },
      refresh() {
        this.sortBy = "prodID";
      },
      toggleSortDirection() {
        console.log("reached");
        this.sortBy = 'name'
        this.sort = this.sort === "asc" ? "desc" : "asc";
      },
      deleteUser(userID) {
        if (confirm("Are you sure you want to delete this user?")) {
          this.$store.dispatch("deleteUser", userID);
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .image {
    width: 5rem;
  }
  .table {
    background-color: #f7f4f1;
  }
  
  .sort-dropdown{
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    border: 2px solid #f7f4f1;
    background-color: #f7f4f1;
    margin-bottom: 1rem;
  }
  
  @media screen and (max-width: 300px) {
    .table {
      width: 280px !important;
    }
  }
  </style>