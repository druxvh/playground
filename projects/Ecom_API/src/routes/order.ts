import e, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { errorHandler } from "../error-handler.js";
import { handleCancelOrder, handleCreateOrder, handleGetOrderById, handleListOrders } from "../controllers/order.js";

const orderRouter: Router = e.Router()

orderRouter.route('/')
    .get([authMiddleware], errorHandler(handleListOrders))
    .post([authMiddleware], errorHandler(handleCreateOrder))

orderRouter.route('/:id')
    .get([authMiddleware], errorHandler(handleGetOrderById))
    .put([authMiddleware], errorHandler(handleCancelOrder))

export default orderRouter