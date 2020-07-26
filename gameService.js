let Deck = require('./deck')
let Player = require('./player')

module.exports = class GameService {
  constructor(room) {
    this.id = room
    this.deck = new Deck
    this.players = {}
    this.nextCardPosition = 0
    this.order = []
    this.nowOrder = 0
    this.gameOver = false

  }
  init() {
    this.gameOver = false
    this.nowOrder = 0
    this.nextCardPosition = 0
    this.resetPlayers()
    this.resetCardOwner()
    this.deck.shuffle()
    this.draw()
    this.players[this.order[this.nowOrder]].turn = true
  }
  resetCardOwner() {
    this.deck.deck.forEach(card => {
      card.resetOwner()
    })
  }
  resetPlayers() {
    for (let player in this.players) {
      this.players[player].reset()
    }
  }
  draw() {
    for (let player in this.players) {
      this.deck.deck[this.nextCardPosition].setOwner(player)
      this.nextCardPosition++
    }
    for (let player in this.players) {
      //score
      let cards = this.deck.deck.filter(card => card.owner === player)
      this.players[player].cards = cards
      let score = this.calculateScore(cards)
      this.players[player].score = score
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
      this.players[socketId] = new Player
      this.order.push(socketId)
    }
    else if (type === 'ready') {
      this.players[socketId].ready = true
      if (this.beginCheck() === true) {
        this.players['banker'] = new Player
        this.order.push('banker')
        this.init()
      }
    }
    else if (type === 'draw') {

      this.deck.deck[this.nextCardPosition].setOwner(socketId)
      this.nextCardPosition++
      //score
      let cards = this.deck.deck.filter(card => card.owner === socketId)
      this.players[socketId].cards = cards
      let score = this.calculateScore(cards)
      this.players[socketId].score = score
      if (cards.length === 5 && score <= 10.5) {
        this.players[socketId].won = true
        this.players[socketId].turn = false
        this.nowOrder++
        this.players[this.order[this.nowOrder]].turn = true
      }
      else if (score > 10.5) {
        this.players[socketId].won = false
        this.players[socketId].turn = false
        this.nowOrder++
        this.players[this.order[this.nowOrder]].turn = true
      }



    }
    else if (type === 'bankerDraw') {
      if (this.players["banker"].score <= 8 && this.players["banker"].cards.length < 5) {

        this.deck.deck[this.nextCardPosition].setOwner("banker")
        this.nextCardPosition++
        //score
        let cards = this.deck.deck.filter(card => card.owner === "banker")
        this.players["banker"].cards = cards
        let score = this.calculateScore(cards)
        this.players["banker"].score = score

        if (score > 10.5) {
          this.players["banker"].won = false
          this.gameOver = true
          for (let player in this.players) {
            if (this.players[player].won === null) {
              this.players[player].won = true
            }
          }
        }
      }
      else if (this.players["banker"].score > 8) {
        for (let player in this.players) {
          if (this.players["banker"].score >= this.players[player].score) {
            this.players[player].won = false
          }
          else {
            this.players[player].won = true
          }
        }
        this.players["banker"].turn = false
        this.gameOver = true
      }



    }
    else if (type === 'pass') {
      //order
      this.players[this.order[this.nowOrder]].turn = false
      this.nowOrder++
      if (this.nowOrder > this.order.length - 1) this.nowOrder = 0
      this.players[this.order[this.nowOrder]].turn = true

    }
    else if (type === 'again') {
      this.init()
    }

  }
  calculateScore(cards) {
    let score = 0
    cards.forEach(card => {
      score += card.score
    })
    return score
  }
  getClientResponse() {
    return {
      id: this.id,
      deck: this.deck.deck,
      players: this.players,
      nextCardPosition: this.nextCardPosition,
      order: this.order,
      nowOrder: this.nowOrder,
      gameOver: this.gameOver,
    }
  }

}