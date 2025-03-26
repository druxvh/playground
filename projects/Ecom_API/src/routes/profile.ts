import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { handleMyProfile } from "../controllers/profile.js";

const profileRouter: Router = express.Router()

profileRouter.route('/')
    .get([authMiddleware], handleMyProfile)


export default profileRouter