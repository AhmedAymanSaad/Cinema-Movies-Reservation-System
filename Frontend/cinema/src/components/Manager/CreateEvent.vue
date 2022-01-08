<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <label>Select a Movie</label>
      <b-form-select
        v-model="formData.movieId"
        :options="options"
        required
      ></b-form-select>
      <div>
        <b-form-datepicker
          v-model="formData.date"
          :min="min"
          locale="us"
          placeholder="Choose a date"
          required
          :state="validateDate"
        ></b-form-datepicker>
      </div>
      <div>
        <label>Choose Start time</label>
        <b-form-timepicker
          v-model="startTimeFull"
          hour12:false
          required
          aria-required="true"
          :state="validateTimeStart"
        ></b-form-timepicker>
        <label>Choose End time</label>
        <b-form-timepicker
          v-model="endTimeFull"
          hour12:false
          required
          :state="validateTimeEnd"
        ></b-form-timepicker>
      </div>
      <div>
        Screening Room:
        <b-form-radio-group 
          v-model="formData.screeningRoom"
          :options="options2"
          name="radio-options"
          class="inline-button"
        ></b-form-radio-group>
      </div>
      <div class="alert alert-danger" role="alert" v-if="serverError">
        {{ errorMsg }}
      </div>
      <div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "CreateEvent",
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    return {
      formData: {
        movieId: "",
        date: "",
        startTime: {
          hour: "",
          minute: "",
        },
        endTime: {
          hour: "",
          minute: "",
        },
        screeningRoom: 1,
      },
      moviesList: [],
      options: [],
      options2: [
        {text:'1',value: 1},
        {text:'2',value: 2}
      ],
      min: minDate,
      startTimeFull: "",
      endTimeFull: "",
      serverError: false,
      errorMsg: "",
    };
  },
  methods: {
    onSubmit() {
      if(!this.validateAll){
        return;
      }
      this.formData.startTime.hour = this.startTimeFull.substring(0,2)
      this.formData.startTime.minute = this.startTimeFull.substring(3,5)
      this.formData.endTime.hour = this.endTimeFull.substring(0,2)
      this.formData.endTime.minute = this.endTimeFull.substring(3,5)
      console.log("Submitting")
      this.$http.post("movies/events",this.formData,
      {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        }
      ).then(
        (response) => {
          console.log(response);
          //this.$router.push({ name: "HomePage" });
        },
        (error) => {
          console.log(error);
          this.serverError = true;
          this.errorMsg = error.body;
        }
      );
    },
    updateMoviesList() {
      this.$http.get("movies/").then(
        (response) => {
          console.log(response);
          console.log(JSON.parse(response.bodyText));
          this.moviesList = JSON.parse(response.bodyText);
          for (let movie in this.moviesList) {
            console.log(this.moviesList[movie].title);
            this.options.push({
              value: this.moviesList[movie]._id,
              text: this.moviesList[movie].title,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  created() {
    this.updateMoviesList();
  },
  computed:{
    validateTimeStart(){
      if(this.startTimeFull==""){
        return false
      }else{
        return true
      }
    },
     validateTimeEnd(){
      if(this.endTimeFull==""){
        return false
      }else{
        return true
      }
    },
     validateDate(){
      if(this.formData.date==""){
        return false
      }else{
        return true
      }
    },
     validateAll(){
      return this.validateDate && this.validateTimeStart && this.validateTimeEnd
    },
  }
};
</script>

<style></style>
