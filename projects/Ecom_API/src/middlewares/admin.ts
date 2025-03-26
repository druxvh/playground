import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types.js";

export async function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {

    const user = req.user!

    if (user.role !== "Admin") {
        res.status(400).json({ message: "Unauthorized Role!" })
        return
    }

    next()
}