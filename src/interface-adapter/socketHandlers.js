import commonContainer from '../infrastructure/containers/commonContainer.js'
import employerContainer from '../infrastructure/containers/employerContainer.js'

const { saveMessageUseCase } = commonContainer()
const { updateApplicationStatusUseCase } = employerContainer()

export const socketHandlers = async (io, socket, connectedUsers) => {
  console.log(connectedUsers)

  socket.on('send-message', async ({ toUserId, message }) => {
    const fromUserId = socket.user.userID
    const receiverSocketId = connectedUsers[toUserId]
    const senderSocketId = connectedUsers[fromUserId]

    const messagePayload = {
      sender: fromUserId,
      receiver: toUserId,
      message: message,
      createdAt: new Date()
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

  socket.on('application-status', async data => {
    const { candidateId, status, jobId, jobTitle } = data
    console.log(candidateId, status)
    await updateApplicationStatusUseCase.execute(jobId, candidateId, status)
    const candidateSocketId = connectedUsers[candidateId]
    if (candidateSocketId) {
      io.to(candidateSocketId).emit('job-notification', {
        candidateId,
        status,
        jobId,
        jobTitle,
        message: `${status === 'shortlisted' ? 'Shortlisted' : 'Rejected'}`
      })
    }
  })
}
