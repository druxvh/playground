import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getTasks(req, res) {

    try {

        const tasks = await prisma.task.findMany()
        res.status(201).json(tasks)

    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function createTask(req, res) {
    try {

        const { task } = req.body

        if (!task) {
            return res.status(400).json({ error: 'task is required' });
        }

        const newTask = await prisma.task.create({
            data: { task }
        })

        res.status(201).json(newTask)


    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function updateTaskById(req, res) {

    try {
        const { id } = req.params
        const { task } = req.body

        if (!task) {
            return res.status(400).json({ error: 'task is required' });
        }

        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { task }
        })

        res.status(201).json(updatedTask)

    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function deleteTaskById(req, res) {

    try {
        const { id } = req.params

        await prisma.task.delete({
            where: { id: Number(id) },
        })

        res.status(201).json({ msg: 'task deleted' })
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}