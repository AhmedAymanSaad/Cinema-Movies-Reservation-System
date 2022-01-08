<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
        <b-navbar-brand href="#">Cinema</b-navbar-brand>
        <b-navbar-nav class="ml-auto text-right">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item
              @click="goToSignIn"
              v-show="this.$store.state.userType == 'Guest'"
              >Sign In</b-dropdown-item
            >
            <b-dropdown-item
              @click="logout"
              v-show="this.$store.state.userType != 'Guest'"
              >Log Out</b-dropdown-item
            >
            <b-dropdown-item
              @click="goToRegister"
              v-show="this.$store.state.userType == 'Guest'"
              >Register</b-dropdown-item
            >
            <b-dropdown-item
              @click="goToReservations"
              v-show="this.$store.state.userType == 'Customer'"
              >Reservations</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto text-right">
          <b-nav-item-dropdown
            text="Manager"
            right
            v-show="this.$store.state.userType == 'Manager'"
          >
            <b-dropdown-item @click="goToCreateMovie"
              >Create Movie</b-dropdown-item
            >
            <b-dropdown-item @click="goToCreateEvent"
              >Create Event</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    Movies:
    <div>
      <b-button v-if="false" ref="refresh" @click="getAllMovies" variant="primary">Check Seats</b-button>
      <keep-alive>
    <span>
      <span v-for="(movie, im) in eventsListRet" :key="im" inline>
        <event-cards
          inline
          v-for="(event, ie) in movie"
          :key="ie"
          :title="moviesList[im].title"
          :indexE="ie"
          :indexM="im"
          :imageUrl="moviesList[im].imageUrl"
          :date="getDate(im, ie)"
          :startTime="getstarttime(im, ie)"
          :screeningRoom="getroom(im, ie)"
          @checkSeatsCall="checkSeats"
        ></event-cards>
      </span>
    </span>
    </keep-alive>
    </div>
  </div>
</template>

<script>
import EventCards from "./EventCards.vue";
export default {
  name: "HomePage",
  data() {
    return {
      moviesList: [],
      eventsList: [],
      createdRun: false,
    };
  },
  methods: {
    checkSeats(im, ie) {
      console.log("Checking Seats for " + im + " " + ie);
      this.$router.push({ name: 'EventDetails', params: { eventId: this.eventsList[im][ie]._id} });
    },
    getDate(im, ie) {
      try {
        //console.log("here"+im+" "+ie)
        return this.eventsList[im][ie].date;
      } catch {
        return 0;
      }
    },
    getstarttime(im, ie) {
      try {
        return (
          this.eventsList[im][ie].startTime.hour +
          ":" +
          this.eventsList[im][ie].startTime.minute
        );
      } catch {
        return 0;
      }
    },
    getroom(im, ie) {
      try {
        return this.eventsList[im][ie].screeningRoom;
      } catch {
        return 0;
      }
    },
    goToSignIn() {
      this.$router.push({ name: "LogInPage" });
    },
    logout() {
      this.$store.commit("logOutUser");
    },
    goToRegister() {
      this.$router.push({ name: "Register" });
    },
    goToReservations() {
      this.$router.push({ name: "Reservations" });
    },
    goToCreateMovie() {
      this.$router.push({ name: "CreateMovie" });
    },
    goToCreateEvent() {
      this.$router.push({ name: "CreateEvent" });
    },
    getAllEvents() {
      for (let movieI in this.moviesList) {
        this.$http.get("movies/events/" + this.moviesList[movieI]._id).then(
          (response) => {
            console.log(response);
            //console.log("movie num "+this.moviesList[movieI]._id)
            //console.log(JSON.parse(response.bodyText));
            let allE = JSON.parse(response.bodyText);
            for (let ev in allE) {
              //console.log(allE[ev]);
              this.eventsList[movieI][ev] = allE[ev];
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    getAllMovies() {
      this.$http
        .get("movies/")
        .then(
          (response) => {
            console.log(response);
            console.log(JSON.parse(response.bodyText));
            this.moviesList = JSON.parse(response.bodyText);
            for (let movie in this.moviesList) {
              console.log(this.moviesList[movie].title);
              this.eventsList.push([]);
            }
            //this.$store.state.moviesList = this.moviesList
            this.getAllEvents();
          },
          (error) => {
            console.log(error);
          }
        )
        .then(() => {
          console.log("set");
          this.createdRun = true;
          this.$store.state.moviesList = this.moviesList;
          this.$store.state.eventsList = this.eventsList;
          this.$forceUpdate()
        });
    },
  },
  computed: {
    eventsListRet() {
      return this.eventsList;
    },
  },
  watch:{
    "moviesList":function(oldVal,newVal){
      console.log("change")
      console.log(oldVal.length + " " + newVal.length);
      
      if(newVal.length==0){ 
        console.log("call get all movies")
        this.getAllMovies()
      }
    }
  },  
  components: {
    EventCards: EventCards,
  },
  created() {
    console.log("createdCalled");
    this.createdRun = true;
    this.createdRun = false;
    this.createdRun = true;
    this.$forceUpdate();
    this.getAllMovies();
    this.$forceUpdate();
    
  },
  renderTriggered() {
    console.log("render triggered Called");
    //this.createdRun=true
    /*
    if(this.createdRun && this.$store.state.moviesList!=[] && this.$store.state.eventsList!=[]){
      this.moviesList = this.$store.state.moviesList
      this.eventsList = this.$store.state.eventsList
    }*/

    this.getAllMovies();
    this.createdRun = true;
    this.createdRun = false;
    this.createdRun = true;
    this.$forceUpdate()
  },
  deactivated(){
    console.log("deac  Called");
  }

};
</script>

<style>.card {
  display: inline-block;
}
</style>
