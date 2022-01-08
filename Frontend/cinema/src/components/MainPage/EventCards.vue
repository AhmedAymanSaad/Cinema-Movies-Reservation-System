<template>
  <span>
      <keep-alive>
    <b-card
      :title="title"
      :img-src="imageUrl"
      img-alt="Image"
      img-top
      tag="article"
      
      
      
    >
      <b-card-text>
        <div>Date {{date}}</div>
        <div>Start Time {{startTime}}</div>
        <div>Screening Room {{screeningRoom}}</div>
      </b-card-text>

      <b-button @click="callcheckSeats" variant="primary">Check Seats</b-button>
    </b-card>
      </keep-alive>
  </span>
</template>

<script>
export default {
  name: "EventCards",
  props: ["imageUrl", "title", "startTime", "screeningRoom", "date","indexE","indexM"],
  methods:{
      callcheckSeats(){
          return this.$emit('checkSeatsCall', this.$props.indexM,this.$props.indexE);
      }
  }
};
</script>

<style>
.card {
  max-width: 20rem;
  display: inline-block;
}</style>
