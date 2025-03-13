// Update a post by ID.

export default function put(req, res) {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = req.url.split("?")[0]
    switch (url) {
        case "/posts":
            const id = req.query.searchParams.get("id")
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            req.posts[id] = req.body
            res.write(JSON.stringify(req.posts[id]))
            res.end()
            break

        default:
            res.statusCode = 400
            res.write(`Cannot Get ${req.url}`)
            res.end()
    }
}