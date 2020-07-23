<template>
  <div ref="move" @click="move" class="Card">
    <img :src="require(`../assets/poker/${this.item.suit}${this.item.value}.jpg`)" alt="notfound" />
  </div>
</template>
<script>
export default {
  name: "Card",
  props: ["timeline", "item", "socket", "socketId", "players", "player1"],
  data: function() {
    return {};
  },
  methods: {
    move: function() {
      if (
        this.players[this.socketId].turn === true &&
        this.item.owner === null
      ) {
        const { move } = this.$refs;
        this.timeline
          .to(move, 0.2, {
            x: this.player1.x,
            y: this.player1.y
          })
          .then(() => {
            this.player1.x += 50;
            this.socket.emit("draw");
          });
      }
    }
  }
};
</script>
<style scoped>
.Card {
  display: inline-block;
  width: 105px;
  height: 150px;
  backface-visibility: hidden;
}
.back {
  position: absolute;
  width: 105px;
  height: 150px;
  background-image: url("../assets/poker/back.jpg");
}
</style>