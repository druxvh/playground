import { Request, Response } from "express";
import { prisma } from "../index.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js";
import { SignUpSchema } from "../schema/user.js";

// Register User
export async function handleSignUp(req: Request, res: Response) {
    try {
        const validateData = SignUpSchema.parse(req.body) // Checks the validation on the req body object
        const { name, email, password, address, role = "User", } = validateData

        const existingUser = await prisma.user.findUnique({ where: { email: email } })

        if (existingUser) {
            res.status(400).json({ error: "User already exists!" });
            return
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashSync(password, 10),
                address: address,
                role: role
            }
        })

        res.status(200).json({ message: "User registered successfully", user })
    } catch (error) {
        console.error("Registering User Error:", error);
        res.status(500).json({ error: "Something went wrong, please try again!" });
    }

}

// Login User
export async function handleLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findFirst({ where: { email: email } })

        if (!user) {
            res.status(400).json({ error: "User does not exist!" });
            return
        }

        const checkPassword = compareSync(password, user.password)

        if (!checkPassword) {
            res.status(400).json({ error: "Incorrect password!" });
            return
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.status(200).json({ user, token })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Something went wrong, please try again!" });
    }
}

