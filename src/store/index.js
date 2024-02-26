import { createStore } from "vuex";
import axios from "axios";
const hostedDB = "https://nodedb-1.onrender.com/";

export default createStore({
  state: {
    users: "",
    user: "",
    selectedProduct: "",
    products: "",
    product: "",
    spinner: "",
    token: "",
  },
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
 
  },
  actions: {
    // fetching users
    async fetchUsers({commit}) {
      try {
        const res= await axios.get(`${hostedDB}users`);
        commit("setUsers", res.data);
      } catch (error) {
        console.error("An error occurred while fetching users:", error);
      }
    },
    // fetching products
    async fetchProducts({commit}) {
      try {
        const res = await axios.get(`${hostedDB}products`);
        commit("setProducts", res.data);
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
      }
    },
    // registering a new user
    async register({commit}, payload) {
      try {
        const res = await axios.post(`${hostedDB}users`, payload);
        const { msg, err } = res.data;
        if (err) {
          console.error("An error occurred:", err);
        } else {
          commit.dispatch("fetchUsers");
          commit("setUser", msg);
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
      }
    },
    // updating an existing user
    async updateUser(context, payload) {
      try {
        const res = await axios.patch(`${hostedDB}users/${payload.userID}`, payload.data);
        if (res.data.msg) {
          context.dispatch("fetchUsers");
          await window.location.reload()
        }
      } catch (error) {
        console.error("An error occurred while updating user:", error);
      }
    },
    // deleting a user
    async deleteUser(context, id) {
      try {
        const res = await axios.delete(`${hostedDB}users/${id}`);
        if (res.data.msg) {
          context.dispatch("fetchUsers");
          console.log("User deleted successfully");
          await window.location.reload()
        }
      } catch (error) {
        console.error("An error occurred while deleting user:", error);
      }
    },
    // adding a new product
    async addProduct({commit}, newProduct) {
      try {
        const res = await axios.post(`${hostedDB}products`, newProduct);
        commit("setProducts", res.data)
         awaitwindow.location.reload()
      } catch (error) {
        console.error("An error occurred while creating product:", error);
      }
    },
    // updating an existing product
    async updateProduct(context, payload) {
      try {
        const res = await axios.patch(`${hostedDB}products/${payload.prodID}`, payload);
        context.commit("setProduct", res.data);
        window.location.reload()
      } catch (error) {
        console.error("An error occurred while updating product:", error);
      }
    },
    // deleting a product
    async deleteProduct(context, prodID) {
      try {
        const res = await axios.delete(`${hostedDB}products/${prodID}`);
        window.location.reload()
        if (res.data.msg) {
          context.commit("setProduct", res.data.msg);
        } else {
          console.error("An error occurred while deleting product:", res.data.err);
        }
      } catch (error) {
        console.error("An error occurred while deleting product:", error);
      }
    }
  },  
  modules: {},
});