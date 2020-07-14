const GameRule = require('./gameRule')
let Deck = require('./deck')

module.exports = class GameService {
  constructor(room) {
    this.id = room
    this.deck = new Deck
    this.players = {}
    this.cardPosition = 0
    this.order = []
    this.nowOrder = 0
  }
  init() {
    this.deck.shuffle()
    this.draw()
    console.log(this.order[this.nowOrder])
    this.players[this.order[this.nowOrder]].turn = true
  }
  draw() {
    for (let player in this.players) {
      this.deck.deck[this.cardPosition].setOwner(player)
      this.cardPosition++
    }

  }
  beginCheck() {
    for (let player in this.players) {
      if (this.players[player].ready === false) return false
    }
    return true
  }
  handleMessage(socketId, type, message) {
    if (type === 'login') {
      this.players[socketId] = {
        ready: false,
        score: 0,
        turn: false,
        won: false
      }
      this.order.push[socketId]
    }
    else if (type === 'ready') {
      this.players[socketId].ready = true
      this.order.push(socketId)
      if (this.beginCheck() === true) {
        this.players['banker'] = {
          ready: true,
          score: 0,
          turn: false,
          won: false
        }
        this.order.push('banker')
        this.init()
      }
    }
    else if (type === 'draw') {
      this.cardPosition++
      this.deck[this.cardPosition].setOwner(socketId)
      //score
      let cards = this.deck.deck.find(card => card.owner === socketId)
      let score = GameRule.calculateScore(cards)
      if (cards.length === 5 && score <= 10.5) this.players[socketId].won = true
      this.players[socketId].score = score

      //order
      this.players[this.order[this.nowOrder]].turn = false
      this.nowOrder++
      if (this.nowOrder > this.order.length - 1) this.nowOrder = 0
      this.players[this.order[this.nowOrder]].turn = true

    }
    else if (type === 'no') {
      //order
      this.players[this.order[this.nowOrder]].turn = false
      this.nowOrder++
      if (this.nowOrder > this.order.length - 1) this.nowOrder = 0
      this.players[this.order[this.nowOrder]].turn = true

    }

  }
  getClientResponse() {
    return {
      id: this.id,
      deck: this.deck,
      players: this.players,
      cardPosition: this.cardPosition,
      order: this.order,
      nowOrder: this.nowOrder,
    }
  }

}