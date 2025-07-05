import commonContainer from '../infrastructure/containers/commonContainer.js'

const { saveMessageUseCase } = commonContainer()

export const socketHandlers = async (io, socket,connectedUsers) => {

  socket.on('send-message', async ({ toUserId, message }) => {
    const fromUserId = socket.user.userID
    const receiverSocketId = connectedUsers[toUserId]
    const senderSocketId = connectedUsers[fromUserId]

    const messagePayload = {
      sender: fromUserId,
      receiver: toUserId,
      message: message
    }
    await saveMessageUseCase.execute(messagePayload)
    console.log(messagePayload)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', messagePayload)
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit('receive_message', messagePayload)
    }
  })
}
