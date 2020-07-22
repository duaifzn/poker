<template>
  <div class="Table">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Table"
};
</script>
<style scoped>
.Table {
  width: 100%;
  height: 500px;
  background-image: url("../assets/table.jpg");
  background-repeat: round;
}
</style>