<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">User Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter user name"
          v-model="user.username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div v-if="errorMsg" class="alert alert-danger" role="alert">
        Invalid user name or password
      </div>
      <div>
        Don't have an account?
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
      <button type="button" class="btn btn-primary" @click="signInUser">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errorMsg: false,
    };
  },
  methods: {
    signInUser() {
      this.$http.post("customers/login", this.user).then(
        (response) => {
          console.log(response);

          this.$router.push({ name: "HomePage" });
          this.$store.commit("setAuth", response.headers.get("x-auth-token"));
          console.log(response.headers.get("x-auth-token"));
          this.getUserAccess();
        },
        (error) => {
          console.log(error);
          this.errorMsg = true;
        }
      );
    },
    getUserAccess() {
      this.$http
        .get("customers/me", {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            console.log(response.body.isManager);
            if (response.body.isManager) {
              console.log("Manager");
              this.$store.commit("setUserType", "Manager");
            } else if (response.body.isAdmin) {
              this.$store.commit("setUserType", "Admin");
              console.log("Admin");
            } else {
              console.log("Customer");
              this.$store.commit("setUserType", "Customer");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
</style>
