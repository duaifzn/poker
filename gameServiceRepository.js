module.exports = class GameServiceRepository {
  constructor() {
    this.services = []
  }
  findById(id) {
    return this.services.find(element => element.id === id)
  }
  insert(gameService) {
    this.services.push(gameService)
  }
}