import { Response } from "express"
import { AuthRequest } from "../types/types.js"

// /profile -> returns the logged in user
export async function handleMyProfile(req: AuthRequest, res: Response) {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    res.status(200).json(req.user)
}
