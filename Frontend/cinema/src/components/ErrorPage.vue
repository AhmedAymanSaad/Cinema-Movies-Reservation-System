<template>
  <div>
    <h1>Error {{ errorCode }}: {{ errorMsg }}</h1>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  props: {
    errorCode: {
      default: 404,
      type: Number,
    },
    errorMsg: {
      default: "Page Not Found",
      type: String,
    },
  },
};
</script>

<style></style>
