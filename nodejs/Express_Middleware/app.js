import e from "express";
import * as fs from "fs";

const app = e()
const port = 3000


// IP Logger Middleware
app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n ${Date.now()}: ${req.ip} ${req.method}: ${req.path} \n`,
        () => next()
    )

})


app.get('/', (req, res) => {
    res.json({ msg: "hey this msg is from mw 1" })
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log('Server listening')
})