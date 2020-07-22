module.exports = class Player {
  constructor() {
    this.ready = false
    this.score = 0
    this.turn = false
    this.won = null
    this.cards = []
  }
  reset() {
    this.ready = true
    this.score = 0
    this.turn = false
    this.won = null
    this.cards = []
  }
}