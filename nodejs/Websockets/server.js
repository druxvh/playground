const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8080 })

console.log("Websockets server is running on ws://localhost:8080")

wss.on("connection", (socket) => {
    console.log("New user joined!")
    console.log(`Total Connections: ${wss.clients.size}`)


    // Listen for messages from this specific client
    socket.on('message', (payload) => {
        // Parse payload as JSON
        const data = JSON.parse(payload)

        console.log(`${data.user}: ${data.text}`)

        // Stringify the object
        const msg = JSON.stringify({
            user: data.user,
            text: data.text,
            time: new Date().toLocaleTimeString()
        })

        // Broadcast to everyone who is currently connected
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(msg)
            }
        })
    })

    socket.on('close', () => {
        console.log('Client Disconnected')
    })

})