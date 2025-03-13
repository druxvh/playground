// Add a new post to the array.

export default function post(req, res) {
    switch (req.url) {
        case "/posts":
            req.posts.push(req.body)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify(req.posts))
            res.end()
            break

        default:
            res.statusCode = 400
            res.write(`Cannot Get ${req.url}`)
            res.end()
    }
}