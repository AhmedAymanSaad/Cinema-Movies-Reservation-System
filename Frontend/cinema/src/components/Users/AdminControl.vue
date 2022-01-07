<template>
  <div>
    <b-form inline @submit.prevent="onSubmit">
      <label class="h2">Delete User:</label>
      <!-- <b-form-group  label="Delete user by:" label-cols-sm="1">
        <b-form-radio-group 
          inline
          v-model="deleteby"
          :options="options"
          name="radio-options"
          class="inline-button"
        ></b-form-radio-group>
      </b-form-group> -->
      <b-form-group
        id="input-group-1"
        label="User Id:"
        label-for="input-1"
        aria-setsize="auto"
      >
        <b-form-input
          id="input-1"
          v-model="deleteUserData"
          placeholder="Enter user data"
          required
        ></b-form-input>
        <div class="alert alert-success" role="alert" v-if="userDeletedSucc&&submitted">
          User deleted Successfully
        </div>
        <div class="alert alert-danger" role="alert" v-if="!userDeletedSucc&&submitted">
  {{errorMsg}}
</div>
        <b-button type="submit" variant="primary">Delete User</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "AdminControl",
  data() {
    return {
      deleteby: "id",
      deleteUserData: "",
      submitted: false,
      userDeletedSucc: false,
      errorMsg:'',
      options: [
        { text: "ID", value: "id" },
        { text: "User name", value: "username" },
      ],
    };
  },
  methods: {
    getAllCustomers() {},
    onSubmit() {
      this.submitted=true
      this.userDeletedSucc=false
      if (this.deleteby == "id") {
        this.deleteUser();
        return;
      }
      if (this.deleteby == "username") {
        this.getId;
        return;
      }
    },
    getId() {},
    deleteUser() {
      //let params = {"x-auth-token": this.$store.state.auth, id:this.deleteUserData}
      //let headers = {"x-auth-token": this.$store.state.auth}
      this.$http
        .delete("customers/" + this.deleteUserData, {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.userDeletedSucc=true
          },
          (error) => {
            console.log(error);
            this.userDeletedSucc=false
            this.errorMsg = error.body.error
          }
        );
    },
  },
};
</script>

<style></style>
