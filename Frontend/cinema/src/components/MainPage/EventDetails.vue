<template>
  <div>
    <span v-if="createdReq">
      <b-card
        :title="details[0].movieId.title"
        :img-src="details[0].movieId.imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2 text-center"
      >
        <b-card-text class="text-center">
          <div>Date {{ details[0].date }}</div>
          <div>
            Start Time
            {{ details[0].startTime.hour + ":" + details[0].startTime.minute }}
          </div>
          <div>Screening Room {{ details[0].screeningRoom }}</div>
          <div class="col-sm" v-if="checkManager()">
            <b-button type="button" variant="primary" @click="editEvent"
              >Edit Event</b-button
            >
          </div>
        </b-card-text>
      </b-card>
      <b-container class="border">
        <b-row v-for="(i, ii) in seats" :key="i.id">
          <b-col
            v-for="(j, ji) in i"
            :key="j.id"
            :class="seatcolor(ii, ji)"
            @click="gridClicked(ii, ji)"
            >{{ ii }}-{{ ji }}-</b-col
          >
        </b-row>
      </b-container>
    </span>
    <div class="alert alert-danger" role="alert" v-if="serverError">
        {{ errorMsg }}
      </div>
    <div>
      <b-button type="button" variant="primary" @click="reserveSeats"
        >Reserve</b-button
      >
    </div>
    <div>
      <b-modal id="modal-1" title="BootstrapVue" @ok="redirectGuest">
    <p class="my-4" >You need to be signed in to reserve! Redirect?</p>
  </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventDetails",
  data() {
    return {
      details: [],
      seats: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      seatsTranslate: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30],
      ],
      reservedSeats: [],
      seatCounter: 0,
      createdReq: false,
      serverError: false,
      errorMsg: "",
    };
  },
  methods: {
    redirectGuest(){
      this.$router.push({ name: "LogInPage" });
    },
    reserveSeats() {
      for (let seat in this.reservedSeats) {
        this.$http
          .post("customers/events/"+this.details[0]._id, {"seat":this.reservedSeats[seat]}, {
            headers: {
              "x-auth-token": this.$store.state.auth,
            },
          })
          .then(
            (response) => {
              console.log(response);
              this.getEventDetails()
              this.$forceUpdate()
            
            },
            (error) => {
              console.log(error);
              this.serverError = true;
              this.errorMsg = error.body;
            }
          );
      }
    },
    seatcolor(ii, ji) {
      if (this.seats[ii][ji] == 0) {
        return "p-3 mb-2 bg-success text-white border";
      } else if (this.seats[ii][ji] == 1) {
        return "p-3 mb-2 bg-danger text-white border";
      } else {
        return "p-3 mb-2 bg-warning text-white border";
      }
    },
    gridClicked(i, j) {
      if(this.$store.state.userType=='Manager' || this.$store.state.userType=='Admin'){
        return
      }
      if(this.$store.state.userType=='Guest'){
        this.$bvModal.show('modal-1')
        return
      }
      console.log("clicked grid " + i + " " + j);
      if (this.seats[i][j] == 1) {
        return;
      }
      if (this.seats[i][j] == 2) {
        for (let ss in this.reservedSeats) {
          if (this.reservedSeats[ss] == this.seatsTranslate[i][j]) {
            this.reservedSeats.splice(ss, 1);
            break;
          }
        }
        //this.reservedSeats.splice(ss,1);
        this.seats[i][j] = 0;
        this.$forceUpdate();
        return;
      }
      this.reservedSeats.push(this.seatsTranslate[i][j]);
      this.seats[i][j] = 2;
      this.$forceUpdate();
    },
    getSize() {
      return this.details[0].screeningRoom ? 4 : 5;
    },
    checkManager() {
      if (this.$store.state.userType == "Manager") {
        return true;
      } else {
        return false;
      }
    },
    editEvent() {
      this.$router.push({
        name: "EditEvent",
        params: { eventId: this.details[0]._id },
      });
    },
    fixSeats() {
      //this.$refs.me.className = "p-3 mb-2 bg-danger text-white border"
    },
    getEventDetails() {
      this.$http.get("movies/" + this.$route.params.eventId).then(
        (response) => {
          console.log(response);
          console.log(JSON.parse(response.bodyText));
          this.details = JSON.parse(response.bodyText);
          this.createdReq = true;
          //this.fixSeats();
          if (this.details[0].screeningRoom == 1) {
            this.seats.splice(4, 2);
          }
          for (let i in this.details[0].reservedSeats) {
            let j = this.details[0].reservedSeats[i].seat;
            console.log("seat resserved " + j);
            let r = 0;
            let c = 0;
            for (let ii in this.seatsTranslate) {
              for (let jj in this.seatsTranslate) {
                if (this.seatsTranslate[ii][jj] == j) {
                  r = ii;
                  c = jj;
                  break;
                }
              }
            }
            console.log(r + " " + c);
            this.seats[r][c] = 1;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  created() {
    this.getEventDetails();
  },
};
</script>

<style></style>
