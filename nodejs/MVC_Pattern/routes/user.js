import e from "express";
import { handleCreateUser, handleDeleteById, handleGetUsers, handleUpdateById } from "../controllers/user.js";

export const UserRouter = e.Router()

UserRouter
    .route('/')
    .get(handleGetUsers)
    .post(handleCreateUser)

UserRouter
    .route('/:id')
    .patch(handleUpdateById)
    .delete(handleDeleteById)
