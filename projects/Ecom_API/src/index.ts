import express, { Express } from "express";
import { PORT } from "./secrets.js";
import rootRouter from "./routes/index.js";
import { PrismaClient } from "@prisma/client";

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', rootRouter)

export const prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log('Server Running on Port: ', PORT)
}) 