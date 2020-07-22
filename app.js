const express = require('express')
const app = express()
const port = 3000
const server = require('http').createServer(app)
const GameServiceRepository = require('./gameServiceRepository')
const GameService = require('./gameService')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})
app.use('/client', express.static(__dirname + '/client'))

server.listen(port, () => {
  console.log("server running")
})


let gameServiceRepository = new GameServiceRepository()

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log('socket conection')
  socket.on('create', room => {
    console.log('socket id: ' + socket.id + ` join ${room} room`)
    socket.join(room)
    let gameService = gameServiceRepository.findById(room)
    if (!gameService) {
      gameService = new GameService(room)

      gameServiceRepository.insert(gameService)
    }
    gameService.handleMessage(socket.id, 'login')
    socket.emit('setId', { socketId: socket.id, signIn: true })

    socket.use(packet => {
      const ROOM = room
      gameService.handleMessage(socket.id, packet[0], packet[1])
      let data = gameService.getClientResponse()

      if (data) {
        io.to(ROOM).emit('state', data);
      }
    })
  })
})




