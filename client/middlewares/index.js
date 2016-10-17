import io from 'socket.io-client'

export const reduxPipe = config => {
  // Create the socket
  const socket = io(config.url)

  // Patch socket.onevent to wildcard
  const { onevent } = socket;
  socket.onevent = function(packet) {
    const { data=[] } = packet
    onevent.call(this, packet);
    packet.data = ['*'].concat(data);
    onevent.call(this, packet);
  }

  // Return the middleware
  return store => {
    // Dispatch all events coming from socket
    socket.on('*', (type, data) => {
      store.dispatch({ type, data })
    })
    return next => {
      return action => {
        // Send action to server if needed
        if (action.pipe || config.sendAll) {
          socket.emit(action.type, action.data)
        }
        // Continue down the middleware chain
        next(action)
      }
    }
  }
}
