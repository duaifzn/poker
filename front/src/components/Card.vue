<template>
  <div ref="move" @click="move" class="Card">
    <div class="front">
      <img :src="require(`../assets/poker/${this.item.suit}${this.item.value}.jpg`)" alt="notfound" />
    </div>
    <div class="back"></div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: ["timeline", "item", "socket", "socketId", "players", "player1"],
  data: function () {
    return {};
  },
  methods: {
    move: function () {
      if (
        this.players[this.socketId].turn === true &&
        this.item.owner === null
      ) {
        const { move } = this.$refs;
        this.timeline
          .to(move, 1, {
            rotateY: 360,
          })
          .then(() => {
            this.socket.emit("draw");
          });
      }
    },
  },
  computed: {},
};
</script>
<style scoped>
.Card {
  position: relative;
  width: 105px;
  height: 150px;
  transform-style: preserve-3d;
}

.front {
  position: absolute;
  backface-visibility: hidden;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 105px;
  height: 150px;
  background-image: url("../assets/poker/back.jpg");
  backface-visibility: hidden;
  transform: rotateY(180deg);
}
</style>