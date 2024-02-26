<template>
    <div>
      <!-- Button trigger modal -->
      <button type="button" class="btn" @click="openEditModal(user.userID)" data-bs-toggle="modal" :data-bs-target="'#texampleModal' + user.userID">Edit</button>
  
      <!-- Modal -->
      <div class="modal fade" :id="'texampleModal' + user.userID" tabindex="-1" :aria-labelledby="'texampleModalLabel' + user.userID" aria-hidden="true"><div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header"><h1 class="modal-title fs-5" id="texampleModalLabel3">Edit Menu </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>UserID:</label>
              <input type="text" placeholder="ID" v-model="updatingUser.userID" />
              <label>First Name:</label>
              <input type="text" placeholder="First Name" v-model="updatingUser.firstName"/>
              <label>Last Name:</label>
              <input type="text" placeholder="Last Name" v-model="updatingUser.lastName"/>
              <label>Age:</label>
              <input type="number" placeholder="Age" v-model="updatingUser.userAge"/>
              <label>Gender:</label>
              <input type="text" placeholder="Gender" v-model="updatingUser.gender"/>
              <label>User Role:</label>
              <input type="text" placeholder="Role" v-model="updatingUser.userRole"/>
              <label>Email Address:</label>
              <input type="text" placeholder="Email Address" v-model="updatingUser.emailAdd"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn" @click="updateProduct(user.userID)">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["user"],
    data() {
      return {
        updatingUser: {
          ...this.user,
        },
        updatingUserID: null,
        model: {
          user: {
            firstName: "",
            lastName: "",
            userAge: "",
            gender: "",
            userRole: "",
            emailAdd: "",
          },
        },
      };
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
    },
    methods: {
      openEditModal(id) {
        this.updatingUserID = id;
        this.updatingUser = {...this.$store.state.users.find((user) => user.userID === id),
        };
      },
      updateProduct(id) {
        this.$store.dispatch("updateUser", {userID: id,data: { ...this.updatingUser },
            })
          .then(() => {console.log("User updated!");
        }).catch((err) => { console.error("Error updating: ", err);
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