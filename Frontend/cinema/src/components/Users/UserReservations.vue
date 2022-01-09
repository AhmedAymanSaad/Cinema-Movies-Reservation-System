<template>
  <div>
    <h1>Reservations</h1>
    <p>click on reservation to cancel it </p>
    <b-alert
      :show="dismissCountDown"
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Can't cancel reservation! Movie starts in less than 3 hours!
    </b-alert>
    <b-list-group>
      <div v-for="(r,e) in reservations" :key="r.id">
      <b-list-group-item
        v-for="(s,i) in r.reservedSeats"
        :key="s.id"
        @click="deleteReservation(i,e)"
        class="p-3 mb-2 bg-danger text-white border"
        >{{r.movieId.title}}, Date:{{r.date}}, Start Time:{{r.startTime.hour + ':' + r.startTime.minute}}, Seat: {{r.reservedSeats[i].seat}} </b-list-group-item
      ></div>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "UserReservations",
  data() {
    return {
      reservations: [],
      seats:[],
      dismissSecs: 5,
        dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    deleteReservation(i,e){
      console.log("delete reserv "+this.reservations[e]._id+" "+this.reservations[e].reservedSeats[i].seat )
      var today = new Date();
      var time = today.getHours()
      var dateM = new Date(this.reservations[e].date)
      if(this.reservations[e].startTime.hour - time <3 && dateM==today){
        this.dismissCountDown = this.dismissSecs
        return
      }
      this.$http
        .delete("customers/reservation/"+this.reservations[e]._id+"/"+this.reservations[e].reservedSeats[i].seat, {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.getReservations()
            this.$forceUpdate()
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getReservations() {
      this.$http
        .get("customers/reservation", {
          headers: {
            "x-auth-token": this.$store.state.auth,
          },
        })
        .then(
          (response) => {
            console.log(response);
            console.log(JSON.parse(response.bodyText));
            this.reservations = JSON.parse(response.bodyText);
            this.seats.push([])
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  created() {
    this.getReservations();
  },
};
</script>

<style></style>
