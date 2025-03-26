import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js";
import { prisma } from "../index.js";
import { AuthRequest } from "../types/types.js";


export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    // 1. extract the token from the header
    const authHeader = req.headers.authorization

    // 2. if no token, throw error unauthorized
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(400).json({ message: "Unauthorized: No valid token provided" })
        return
    }

    const token = authHeader.split(' ')[1] // Gets the token after the "Bearer"

    try {
        // 3. if token, verify token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as { userId: number }

        // 4. get user from the payload
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })

        if (!user) {
            res.status(400).json({ error: "Unauthorized: User not found!" });
            return
        }
        // 5. to attach the user to the current req object
        req.user = user

        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}
