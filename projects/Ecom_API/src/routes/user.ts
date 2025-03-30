import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { handleGetUserById, handleListAllUsers, handleMyProfile, handleUpdateUser } from "../controllers/user.js";

const userRouter: Router = express.Router()

userRouter.route('/profile')
    .get([authMiddleware], handleMyProfile)

userRouter.route('/')
    .get([authMiddleware], handleListAllUsers)

userRouter.route('/:id')
    .get([authMiddleware], handleGetUserById)
    .put([authMiddleware], handleUpdateUser)



export default userRouter