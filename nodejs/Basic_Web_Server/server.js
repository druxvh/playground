// A node js basic web server
import { createServer } from "node:http";

const hostname = '127.0.0.1'
const port = 3000;

// The createServer() method of http creates a new HTTP server and returns it.
const server = createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World, This is a nodejs web server!')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})