<template>
  <div>
    <h1>Test Page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores,
      aut autem, blanditiis consequuntur dolore excepturi laborum maiores minima
      nihil non nulla obcaecati quas quibusdam quod sed suscipit vero
      voluptatem.
    </p>
    <button type="button" class="btn btn-primary" @click="logout">Temp Logout</button>
    <p>{{ userType }}</p>
  </div>
</template>

<script>
import { store } from "../store/store.js";
export default {
  name: "Home",
  data() {
    return {
      userType: store.state.userType,
    };
  },
  methods:{
    logout(){
      this.$store.commit('logOutUser')
    }
  }
};
</script>

<style></style>
