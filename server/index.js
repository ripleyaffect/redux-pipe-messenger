const express = require('express')
const Server = require('http').Server

const { PORT } = require('./config')
const { registerSockets } = require('./sockets')

// Create the app and server
const app = express()
const server = Server(app)

// Apply static middleware
app.use('/static', express.static(__dirname + '/public'))

// Apply router middleware
app.use('/api', require('./routers/api'))

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// Set up sockets configuration
registerSockets(server)

// Start the server listening 
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
