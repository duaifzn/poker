
function calculateScore(cards) {
  let score = 0
  cards.forEach(card => {
    score += card.score
  })
  return score
}

module.exports = {
  calculateScore
}