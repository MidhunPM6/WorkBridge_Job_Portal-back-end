import { Server } from 'socket.io'
import { socketHandlers } from '../../interface-adapter/socketHandlers.js'
import { socketAuthMiddleware } from '../middleware/socketioAuth.js'

export const createSocketServer = server => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://work-bridge-sooty.vercel.app'],
      credentials: true
    }
  })

  const connectedUsers = {}

  io.use(socketAuthMiddleware)

  io.on('connect', socket => {
    console.log('a user connected');
    
    connectedUsers[socket.user.userID] = socket.id

    socketHandlers(io, socket,connectedUsers)

    socket.on('disconnect', () => {
      console.log('a user disconnected')
      delete connectedUsers[socket.user.userID]
    })
  })
}
