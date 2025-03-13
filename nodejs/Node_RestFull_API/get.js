// Fetch all posts or a single post by ID.

export default function get(req, res) {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = req.url.split("?")[0]

    switch (url) {

        case "/posts":
            if (req.query.searchParams.get("id")) {
                const id = req.query.searchParams.get("id")
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.write(JSON.stringify(req.posts[id]))
                res.end()

            } else {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.write(JSON.stringify(req.posts))
                res.end()
            }
            break

        default:
            res.statusCode = 400
            res.write(`Cannot Get ${req.url}`)
            res.end()
    }
}