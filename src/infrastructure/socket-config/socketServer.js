import { Server } from 'socket.io'
import cors from 'cors'
import { socketHandlers } from '../../interface-adapter/socketHandlers.js'

export const createSocketServer = server => {
  const io = new Server(server,{
    cors: {
      origin: ['http://localhost:3000', 'https://work-bridge-sooty.vercel.app'],
      credentials: true
    }
  })
  
  io.on('connection', socket => {

    console.log('a user connected')

    socketHandlers(io, socket)

    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
  })
}
