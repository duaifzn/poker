const Card = require('./card.js')
const suits = ['Heart', 'Diamond', 'Club', 'Spade']
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']


module.exports = class Deck {
  constructor() {
    this.deck = []
    this.createDeck()
  }
  createDeck() {
    suits.forEach(suit => {
      values.forEach(value => {
        this.deck.push(new Card(suit, value))
      })
    })
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    return this.deck
  }

}

