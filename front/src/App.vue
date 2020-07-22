<template>
  <div id="app">
    <Tenhalf :socket="socket"></Tenhalf>
  </div>
</template>

<script>
import socket from "socket.io-client";
import Tenhalf from "./components/Tenhalf";
export default {
  name: "App",
  data() {
    return {
      socket: socket("http://" + window.location.hostname + ":3000")
    };
  },
  components: {
    Tenhalf
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
