import e from "express";
const app = e()
const port = 3000

app.get('/', (req, res) => {
    res.send('hello express')
})

app.listen(port, () => {
    console.log('Server Running')
})