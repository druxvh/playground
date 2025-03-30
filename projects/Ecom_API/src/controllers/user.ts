import { Response } from "express"
import { AuthRequest } from "../types/types.js"
import { prisma } from "../index.js"

// /profile -> returns the logged in user
export async function handleMyProfile(req: AuthRequest, res: Response) {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    res.status(200).json(req.user)
}

export async function handleListAllUsers(req: AuthRequest, res: Response) {
    const skip = Number(req.query?.skip) || 0
    const users = await prisma.user.findMany({
        skip: skip,
        take: 25
    })
    res.status(200).json({ message: "All users fetched: ", users })
}

export async function handleGetUserById(req: AuthRequest, res: Response) {
    const userId = Number(req.params?.id)
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            res.status(400).json({ message: "User not found" })

        }

        res.status(200).json({ message: "User fetched: ", user })
    } catch (error) {
        res.status(400).json({ message: "Error fetching the user." })

    }
}

export async function handleUpdateUser(req: AuthRequest, res: Response) {
    const userId = Number(req.params?.id)
    const userData = req.body
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: userData
        })

        res.status(200).json({ message: "User updated successfully! ", user })
    } catch (error) {
        res.status(400).json({ message: "Error updating the user." })

    }
}
