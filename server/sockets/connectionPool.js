const _ = require('lodash')

let pool = []

const getSockets = () => {
  return pool
}

const getFilteredSockets = (filterFunction) => {
  return _.isFunction(filterFunction) ?
    getSockets().filter(filterFunction)
  : getSockets()
}

const addSocket = (socket) => {
  pool = pool.concat(socket)
  console.log(`Added socket ${socket.id} to pool`)
  console.log(`There are now ${pool.length} connections`)
  return socket
}

const removeSocket = (socket) => {
  pool = pool.filter(s => s.id != socket.id)
  console.log(`Removed socket ${socket.id} from pool`)
  console.log(`There are now ${pool.length} connections`)
  return true
}

const broadcast = (name, data, filterFunction) => {
  // Get all the sockets
  let sockets = getFilteredSockets(filterFunction)

  // Emit on all sockets
  sockets.forEach(socket => {
    socket.emit(name, data)
  })

  return true
}

module.exports = {
  addSocket,
  broadcast,
  getSockets,
  removeSocket,
}