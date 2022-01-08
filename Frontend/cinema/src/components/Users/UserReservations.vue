<template>
  <div>
    <h1>Reservations</h1>
    <p>click on reservation to cancel it </p>
    <b-list-group>
      <b-list-group-item
        v-for="(r,i) in reservations"
        :key="r.id"
        @click="deleteReservation(i)"
        class="p-3 mb-2 bg-danger text-white border"
        >{{reservations[i].movieId.title}}, Date:{{reservations[i].date}}, Start Time:{{reservations[i].startTime.hour + ':' + reservations[i].startTime.minute}}, Seat: {{Math.floor(Math.random() * 20)}} </b-list-group-item
      >
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
    };
  },
  methods: {
    deleteReservation(i){
      console.log("delete reserv "+i)
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
