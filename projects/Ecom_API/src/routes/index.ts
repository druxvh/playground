import express, { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";
import userRouter from "./user.js";

const rootRouter: Router = express.Router()

rootRouter.use('/a', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/cart', cartRouter)
rootRouter.use('/order', orderRouter)


export default rootRouter