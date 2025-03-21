import e from "express";
import { createTasks, deleteTaskById, getTasks, updateTaskById } from "../controllers/task.js";

export const router = e.Router()

router.route('/')
    .get(getTasks)
    .post(createTasks)

router.route('/:id')
    .patch(updateTaskById)
    .delete(deleteTaskById)