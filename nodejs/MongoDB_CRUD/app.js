import e from "express";
import mongoose from "mongoose";

const app = e()
const port = 3000

// mongodb connection with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test1')
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log(err))

// Schema (Mongoose)
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// Model
const User = mongoose.model('user', userSchema)


app.use(e.urlencoded())

app.route('/users')
    .get(async (req, res) => {
        const doc = await User.find({})
        res.json(doc)
    })

    .post(async (req, res) => {
        const body = req.body

        if (!body || !body.firstName || !body.lastName || !body.email) {
            return res.status(400).json({ msg: 'All fields are required' })
        }

        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        })

        console.log('result: ', result)

        return res.status(201).json({ msg: 'success' })
    })

    .put((req, res) => {
        res.send('Got a PUT request at /user')
    })

    .delete((req, res) => {
        res.send('Got a DELETE request at /user')
    })

app.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndUpdate(id, { lastName: "changed" })
    return res.json({ msg: 'succss' })
})
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.json({ msg: 'succss' })
})

app.listen(port, () => {
    console.log('Server listening')
})