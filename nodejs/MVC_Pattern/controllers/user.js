import { User } from "../models/user.js"

export async function handleGetUsers(req, res) {
    const doc = await User.find({})
    return res.json(doc)
}

export async function handleCreateUser(req, res) {
    const body = req.body

    if (!body || !body.firstName || !body.lastName || !body.email) {
        return res.status(400).json({ msg: 'All fields are required' })
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
    })

    return res.status(201).json({ msg: 'User created' })
}

export async function handleUpdateById(req, res) {
    const id = req.params.id
    await User.findByIdAndUpdate(id, { lastName: "changed" })
    return res.json({ msg: 'User updated by Id' })
}

export async function handleDeleteById(req, res) {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.json({ msg: 'User deleted by Id' })
}