export const socketHandlers = (io, socket) => {
    socket.on('send-message', (data) => {
        console.log("helo",data)
        io.emit('receive-message', data)
        
    })
}
 