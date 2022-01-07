<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm"><b-button type="button" variant="primary" @click="authenticateUser(ind)">Authenticate User</b-button></div>
        <div class="col-sm">ID: {{ list._id }}</div>
        <div class="col-sm">UserName: {{ list.username }}</div>
        <div class="col-sm">Email: {{ list.email }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserTab",
  props: ["list", "ind"],
  methods: {
    authenticateUser(index) {
      this.$emit("authUser", index);
    },
  },
};
</script>

<style></style>
