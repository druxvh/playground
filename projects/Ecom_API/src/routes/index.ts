import express, { Router } from "express";
import profileRouter from "./profile.js";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import cartRouter from "./cart.js";

const rootRouter: Router = express.Router()

rootRouter.use('/a', authRouter)
rootRouter.use('/profile', profileRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/cart', cartRouter)


export default rootRouter