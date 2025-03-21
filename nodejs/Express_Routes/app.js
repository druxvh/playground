import e from "express";

const app = e()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello')
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