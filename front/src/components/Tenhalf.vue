<template>
  <div class="Tenhalf">
    <Login :socket="socket" v-if="!signIn"></Login>
    <Table v-if="signIn">
      <button v-if="!ready" @click="Ready" class="ready-btn">ready</button>
      <div v-if="gameOver" class="again">
        <h1 v-if="players[socketId].won" class="result">win</h1>
        <h1 v-if="!players[socketId].won" class="result">lose</h1>
        <button @click="Again" class="again-btn">again</button>
      </div>

      <Player v-if="ready" class="banker">
        <Card
          class="cards"
          v-for="(item,index) in sortDeckCard(null)"
          :key="index"
          :item="item"
          :timeline="timeline"
          :socket="socket"
          :socketId="socketId"
          :players="players"
          :style="deckCards"
          :player1="player1"
        ></Card>
      </Player>
      <Player v-if="ready" class="bankercard">
        <Card
          class="cards"
          v-for="(item,index) in players['banker'].cards"
          :key="index"
          :item="item"
          :timeline="timeline"
          :socket="socket"
          :socketId="socketId"
          :players="players"
          :style="playerCard"
          :class="{'first-card': index === 0 && gameOver === false}"
        ></Card>
      </Player>
      <Player v-if="ready" class="player1">
        <Card
          class="cards"
          v-for="(item,index) in players[socketId].cards"
          :key="index"
          :item="item"
          :timeline="timeline"
          :socket="socket"
          :socketId="socketId"
          :players="players"
          :style="playerCard"
          :class="{'b':players[socketId].turn === true}"
        ></Card>
        <button v-if="players[socketId].turn" @click="pass" class="pass-btn">pass</button>
      </Player>
      <Player v-if="ready && order.length >= 3" class="player2">
        <Card
          class="cards"
          v-for="(item,index) in players[order[player2pos]].cards"
          :key="index"
          :item="item"
          :timeline="timeline"
          :socket="socket"
          :socketId="order[player2pos]"
          :players="players"
          :style="playerCard"
          :class="{'first-card': index === 0 && gameOver === false, 'b':players[order[player2pos]].turn === true}"
        ></Card>
      </Player>
      <Player v-if="ready && order.length == 4" class="player3">
        <Card
          class="cards"
          v-for="(item,index) in players[order[player3pos]].cards"
          :key="index"
          :item="item"
          :timeline="timeline"
          :socket="socket"
          :socketId="order[player3pos]"
          :players="players"
          :style="playerCard"
          :class="{'first-card': index === 0 && gameOver === false,'b':players[order[player3pos]].turn === true}"
        ></Card>
      </Player>
    </Table>
  </div>
</template>

<script>
import Login from "./Login";
import Table from "./Table";
import Player from "./Player";
import Card from "./Card";
import mixinGsap from "../../mixins/gsap";
export default {
  name: "Tenhalf",
  props: ["socket"],
  data: function () {
    return {
      signIn: false,
      ready: false,
      id: "",
      socketId: "",
      deck: [],
      players: {},
      nextCardPosition: 0,
      order: [],
      nowOrder: 0,
      gameOver: false,
      player2pos: 1,
      player3pos: 1,
      deckCards: {
        position: "absolute",
        transform: "rotateY(180deg)",
      },
      playerCard: {
        float: "left",
      },
    };
  },
  mixins: [mixinGsap],
  components: {
    Login,
    Table,
    Card,
    Player,
  },
  methods: {
    Ready: function () {
      this.socket.emit("ready");
    },
    Again: function () {
      this.socket.emit("again");
    },
    stateResponse: function (data) {
      this.ready = data.players[this.socketId].ready;
      this.id = data.id;
      this.deck = data.deck.reverse();
      this.players = data.players;
      this.nextCardPosition = data.nextCardPosition;
      this.order = data.order;
      this.nowOrder = data.nowOrder;
      this.gameOver = data.gameOver;
    },
    sortDeckCard: function (id) {
      return this.deck.filter((element) => element.owner == id);
    },
    pass: function () {
      this.socket.emit("pass");
    },
  },

  mounted: function () {
    this.socket.on("state", (data) => {
      this.stateResponse(data);
      if (this.players["banker"].turn === true) {
        this.socket.emit("bankerDraw");
      }

      if (this.order[0] === this.socketId) {
        this.player2pos = 1;
        this.player3pos = 2;
      } else if (this.order[1] === this.socketId) {
        this.player2pos = 0;
        this.player3pos = 2;
      } else if (this.order[2] === this.socketId) {
        this.player2pos = 0;
        this.player3pos = 1;
      }
    });
    this.socket.on("setId", (data) => {
      this.socketId = data.socketId;
      this.signIn = data.signIn;
    });
  },
};
</script>
<style scoped>
.ready-btn {
  position: relative;
  border: solid 1px #000000;
  border-radius: 20px;
  width: 15%;
  height: 40px;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pass-btn {
  border: solid 1px #000000;
  border-radius: 20px;
  width: 15%;
  height: 40px;
  right: 0;
}
.again-btn {
  border: solid 1px #000000;
  border-radius: 10px;
  height: 40px;
}
.banker {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
}
.bankercard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.player1 {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px #000000;
}
.player2 {
  position: absolute;
  left: 5%;
  border: solid 1px #000000;
}
.player3 {
  position: absolute;
  left: 60%;
  border: solid 1px #000000;
}
.again {
  text-align: center;
  z-index: 2;
}
.first-card {
  transform: rotateY(180deg);
}
.b {
  border: 5px solid yellow;
}
.result {
  color: red;
}
</style>