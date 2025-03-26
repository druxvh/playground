import express, { Router } from "express";
import { handleLogin, handleSignUp } from "../controllers/auth.js";

const authRouter: Router = express.Router()

authRouter.route('/register')
    .post(handleSignUp)

authRouter.route('/login')
    .post(handleLogin)

export default authRouter