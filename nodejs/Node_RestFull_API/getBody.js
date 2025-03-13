export default function getBody(req, res, next) {
    let data = []

    // assemble stream of data from request body
    req.on("data", dataChunk => {
        data.push(dataChunk)
    })

    req.on("end", () => {
        req.body = Buffer.concat(data).toString()
        if (req.headers["content-type"] === "application/json") {

            req.body = JSON.parse(req.body)
        }

        // move on to next step in handling respone
        next(req, res)
    })

}