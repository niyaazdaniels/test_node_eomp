<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn" @click="openEditModal(product.prodID)" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + product.prodID">Edit</button>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal' + product.prodID" tabindex="-1" :aria-labelledby="'exampleModalLabel'" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>Product name:</label>
            <input placeholder="name" type="text" v-model="editingProduct.prodName"/>
            <label>Product quantity:</label>
            <input placeholder="quantity" type="number" v-model="editingProduct.quantity"/>
            <label>Product price:</label>
            <input placeholder="price" type="number" v-model="editingProduct.amount"/>
            <label>Product category:</label>
            <input placeholder="category" type="text" v-model="editingProduct.Category"/>
            <label>Product image:</label>
            <input placeholder="image" type="text" v-model="editingProduct.prodUrl"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn" @click="updateProduct(product.prodID)">Save changes</button>
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
      editingProduct: {
        ...this.product,
      },
      editingProductID: null,
      model: {
        product: {
          prodName: "",
          quantity: 0,
          amount: "",
          category: "",
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
      this.editingProductID = prodID;
      this.editingProduct = {
        ...this.$store.state.products.find(
          (product) => product.prodID === prodID
        ),
      };
    },
    updateProduct(prodID) {
      this.$store.dispatch("updateProduct", {prodID: prodID,...this.editingProduct,
      }).then(() => { alert("Product updated!");
        }).catch((err) => {
          alert("Error updating: ", err);
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