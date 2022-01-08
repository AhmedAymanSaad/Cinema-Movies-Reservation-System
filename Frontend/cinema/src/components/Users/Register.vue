<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="First Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formData.firstName"
          placeholder="Enter first name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.lastName"
          placeholder="Enter last name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="formData.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="User Name:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="formData.username"
          type="text"
          placeholder="Enter user name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Password:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="formData.password"
          type="password"
          placeholder="Enter password"
          :state="validation"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-invalid-feedback :state="validatePasswordLength">
        Your password must more than 8 characters long.
      </b-form-invalid-feedback>
      <b-form-invalid-feedback :state="validatePasswordLetter">
        Your password must contain a letter.
      </b-form-invalid-feedback>
      <b-form-invalid-feedback :state="validatePasswordNumber">
        Your password must contain a number.
      </b-form-invalid-feedback>
      <b-form-group
        id="input-group-6"
        label="Confirm Password:"
        label-for="input-6"
      >
        <b-form-input
          id="input-6"
          type="password"
          v-model="confirmPass"
          placeholder="Enter password again"
          :state="validateConfirmPass"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validateConfirmPass">
          Passwords dosen't match.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Select user type:">
        <b-form-radio-group
          id="radio-group-1"
          v-model="formData.role"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <div class="alert alert-danger" role="alert" v-if="serverError">
        {{ errorMsg }}
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    Already Registered?
    <router-link :to="{ name: 'LogInPage' }">Sign In</router-link>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "Customer",
      },
      confirmPass: "",
      submitted: false,
      options: [
        { text: "User Account", value: "Customer" },
        { text: "Manager Account", value: "Manager" },
      ],
      serverError: false,
      errorMsg: "",
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      if (!(this.validation && this.validateConfirmPass)) {
        console.log("validation failed, request aborted");
        return;
      }
      this.$http.post("customers/", this.formData).then(
        (response) => {
          console.log(response);
          console.log("user created");
          this.$router.push({ name: "HomePage" });
          this.$store.commit("setAuth", response.headers.get("x-auth-token"));
          console.log(response.headers.get("x-auth-token"));
          this.$store.commit("setUserType", "Customer");
        },
        (error) => {
          console.log(error);
          this.serverError = true;
          this.errorMsg = error.body;
        }
      );
    },
  },
  computed: {
    validation() {
      if (!this.submitted) {
        return null;
      }
      return (
        this.validatePasswordLength &&
        this.validatePasswordNumber &&
        this.validatePasswordLetter
      );
    },
    validatePasswordLength() {
      if (!this.submitted) {
        return true;
      }
      return this.formData.password.length > 8;
    },
    validatePasswordNumber() {
      if (!this.submitted) {
        return true;
      }
      return /\d/.test(this.formData.password);
    },
    validatePasswordLetter() {
      if (!this.submitted) {
        return true;
      }
      return /[a-zA-Z]/.test(this.formData.password);
    },
    validateConfirmPass() {
      if (!this.submitted || !this.validation) {
        return null;
      }
      return this.formData.password == this.confirmPass;
    },
  },
};
</script>

<style>
</style>
