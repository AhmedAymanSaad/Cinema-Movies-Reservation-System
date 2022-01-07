<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label-for="input-movie" label="Movie Title">
        <b-form-input
          type="text"
          id="input-movie"
          v-model="formData.title"
          required
          placeholder="Enter Movie Title"
        ></b-form-input
      ></b-form-group>
      <b-form-group label-for="input-url" label="Movie Image URL">
        <b-form-input
          type="text"
          id="input-url"
          v-model="formData.imageUrl"
          required
          placeholder="Enter Movie Image URL"
        ></b-form-input
      ></b-form-group>
      <div class="alert alert-danger" role="alert" v-if="serverError">
        {{ errorMsg }}
      </div>
      <div
            class="alert alert-success"
            role="alert"
            v-if="successShow"
          >
            Movie Added Successfully
          </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "CreateMovie",
  data() {
    return {
      formData: {
        title: "",
        imageUrl: "",
      },
      serverError: false,
      errorMsg: "",
      successShow: false
    };
  },
  methods: {
    onSubmit() {
      this.serverError=false
      this.successShow=false
      this.$http
        .post("movies/", this.formData , {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.successShow = true;
          },
          (error) => {
            console.log(error);
            this.serverError = true;
            this.errorMsg = error.body;
          }
        );
    },
  },
};
</script>

<style></style>
