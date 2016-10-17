const SocketIO = require('socket.io')

const connectionPool = require('./connectionPool')

const configureSocket = (socket) => {
  // Add socket to connection pool
  connectionPool.addSocket(socket)

  // Handle socket disconnecting
  socket.on('disconnect', () => connectionPool.removeSocket(socket))

  socket.on('MESSAGE_SENT', (data) => {
    connectionPool.broadcast('MESSAGE_RECIEVED', data, s => s.id != socket.id)
  })
}

const configureSocketServer = (io) => {
  io.on('connection', configureSocket)
  return io
}

const registerSockets = (server) => {
  return configureSocketServer(SocketIO(server))
}

module.exports = {
  registerSockets,
}
