<template>
    <div>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn"
        @click="openEditModal(product.prodID)"
        data-bs-toggle="modal"
        :data-bs-target="'#exampleModal' + product.prodID"
      >
        edit
      </button>
  
      <!-- Modal -->
      <div
        class="modal fade"
        :id="'exampleModal' + product.prodID"
        tabindex="-1"
        :aria-labelledby="'exampleModalLabel' + product.prodID"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>Product name:</label>
              <input placeholder="Name" type="text" v-model="updatingProduct.prodName"/>
              <label>Product quantity:</label>
              <input placeholder="Quantity" type="number" v-model="updatingProduct.quantity"/>
              <label>Product price:</label>
              <input placeholder="Price" type="number" v-model="updatingProduct.amount"/>
              <label>Product category:</label>
              <input placeholder="Category" type="text" v-model="updatingProduct.Category"/>
              <label>Product image:</label>
              <input placeholder="Image" type="text"  v-model="updatingProduct.prodUrl"/>
                        </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn" @click="updateProduct(product.prodID)">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["product"],
    data() {
      return {
        updatingProduct: {
          ...this.product,
        },
        updatingProductID: "",
        model: {
          product: {
            prodName: "",
            quantity: 0,
            amount: 0,
            quantity: "",
            Category: "",
            prodUrl: "",
          },
        },
      };
    },
    computed: {
      currentProduct() {
        return this.$store.state.product;
      },
    },
    methods: {
      openEditModal(prodID) {
        this.updatingProductID = prodID;
        this.updatingProduct = {
          ...this.$store.state.products.find(
            (product) => product.prodID === prodID
          ),
        };
      },
      updateProduct(prodID) {
        this.$store
          .dispatch("updateProduct", {
            prodID: prodID,
            ...this.updatingProduct,
          })
          .then(() => {
            console.log("Product updated!");
          })
          .catch((err) => {
            console.error("Error updating: ", err);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .btn {
    border: 2px solid #f7f4f1;
    background-color: #f7f4f1;
    margin-bottom: 1rem;
    color: black;
  }
  
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
  }
  </style>