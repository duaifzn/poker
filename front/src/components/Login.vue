<template>
  <div class="Login">
    <div class="row">
      <input type="text" placeholder="Channel" v-model="room" />
    </div>
    <div class="row">
      <input type="text" placeholder="Type name" v-model="name" />
    </div>
    <div class="row">
      <button @click="login">Join</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  props: ["socket"],
  data: function() {
    return {
      room: "",
      name: ""
    };
  },

  methods: {
    login: function() {
      if (this.room.trim().length > 0 && this.name.trim().length > 0) {
        this.socket.emit("create", this.room);
      }
    }
  }
};
</script>
<style scoped>
.Login {
  position: relative;
  margin: 0 auto;
  width: 30%;
  border: solid 1px #000000;
  border-radius: 10px;
  background-image: url("../assets/table.jpg");
  text-align: center;
}
.row {
  margin-top: 5%;
  margin-bottom: 5%;
}
input {
  width: 80%;
  border: none;
  border-bottom: solid 1px #000000;
}
button {
  border: solid 1px #000000;
  border-radius: 20px;
  width: 50%;
  height: 40px;
}
</style>
