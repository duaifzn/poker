

module.exports = class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
    this.owner = null
    this.score = 0
    this.setScore()
  }
  setOwner(socketId) {
    this.owner = socketId
  }
  setScore() {
    if (this.value === 'Ace') this.score = 1
    else if (this.value === '2') this.score = 2
    else if (this.value === '3') this.score = 3
    else if (this.value === '4') this.score = 4
    else if (this.value === '5') this.score = 5
    else if (this.value === '6') this.score = 6
    else if (this.value === '7') this.score = 7
    else if (this.value === '8') this.score = 8
    else if (this.value === '9') this.score = 9
    else if (this.value === '10') this.score = 10
    else if (this.value === 'Jack') this.score = 0.5
    else if (this.value === 'Queen') this.score = 0.5
    else if (this.value === 'King') this.score = 0.5
  }
  resetOwner() {
    this.owner = null
  }
}
