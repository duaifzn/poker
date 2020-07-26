<template>
  <div class="Player">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Player",
};
</script>
<style scoped>
.Player {
  width: 50%;
  height: 100px;
}
</style>