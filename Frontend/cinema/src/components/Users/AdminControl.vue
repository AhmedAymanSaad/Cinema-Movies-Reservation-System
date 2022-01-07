<template>
  <div>
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
          <div
            class="alert alert-success"
            role="alert"
            v-if="userDeletedSucc && submitted"
          >
            User deleted Successfully
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="!userDeletedSucc && submitted"
          >
            {{ errorMsg }}
          </div>
          <b-button type="submit" variant="primary">Delete User</b-button>
        </b-form-group>
      </b-form>
    </div>
    <!-- <div>
      <b-button type="button" variant="primary" @click="getManagersRequestingAuth">Load Users Requesting Authentication</b-button>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
    </div> -->
    <div class="col-md-12 text-center">
      <b-button
        type="button"
        variant="primary"
        @click="getManagersRequestingAuth"
        >Load Users Requesting Authentication</b-button
      >
      <user-tab
        v-for="(userData, i) in items"
        v-bind:key="userData.id"
        v-bind:list="userData"
        v-bind:ind="i"
        @authUser="authenticateUser"
        >{{ userData }}</user-tab
      >
    </div>
  </div>
</template>

<script>
import UserTab from "./UserTab.vue";
export default {
  name: "AdminControl",
  data() {
    return {
      deleteby: "id",
      deleteUserData: "",
      submitted: false,
      userDeletedSucc: false,
      errorMsg: "",
      options: [
        { text: "ID", value: "id" },
        { text: "User name", value: "username" },
      ],
      currentPage: 1,
      perPage: 3,
      items: [],
    };
  },
  components: {
    userTab: UserTab,
  },
  methods: {
    authenticateUser(index) {
      console.log("auth user " + index);
      let putBody = { id: [`${this.items[index]._id}`] };
      console.log(putBody);
      this.$http
        .put("customers/authorize", putBody, {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.items.splice(index, 1);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getManagersRequestingAuth() {
      this.$http
        .get("customers/authorize", {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            console.log(JSON.parse(response.bodyText));
            this.items = JSON.parse(response.bodyText);
            for (let user in response) {
              console.log(user);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    onSubmit() {
      this.submitted = true;
      this.userDeletedSucc = false;
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
            this.userDeletedSucc = true;
          },
          (error) => {
            console.log(error);
            this.userDeletedSucc = false;
            this.errorMsg = error.body.error;
          }
        );
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style></style>
