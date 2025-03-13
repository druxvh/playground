import http from "http"
import { URL } from 'url'
import get from "./get.js"
import post from "./post.js"
import put from "./put.js"
import deleteR from "./delete.js"
import posts from "./data.js"
import getBody from "./getBody.js"

const hostname = '127.0.0.1'
const port = 4000

//create our server object, pass server function as callback argument
const server = http.createServer((req, res) => {
    // add the data to the request object so our routes can access it
    req.posts = posts
    req.query = new URL(req.url, `http://${req.headers.host}`)

    // handle request based on method then URL
    switch (req.method) {
        case "GET":
            getBody(req, res, get)
            break

        case "POST":
            getBody(req, res, post)
            break

        case "PUT":
            getBody(req, res, put)
            break

        case "DELETE":
            getBody(req, res, deleteR)
            break

        default:
            // send response for requests with no other response
            res.statusCode = 400
            res.write("No Response")
            res.end()
    }
})

server.listen(port, hostname, err => {
    err ? console.error(err) : console.log(`Server listening on port ${port}`)
})