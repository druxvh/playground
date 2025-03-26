import express, { Router } from "express";
import profileRouter from "./profile.js";
import authRouter from "./auth.js";

const rootRouter: Router = express.Router()

rootRouter.use('/a', authRouter)
rootRouter.use('/profile', profileRouter)


export default rootRouter