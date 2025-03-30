import e, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { errorHandler } from "../error-handler.js";
import { handleCancelOrder, handleChangeOrderStatus, handleCreateOrder, handleGetOrderById, handleListAllOrders, handleListOrders, handleListUserOrdersById } from "../controllers/order.js";
import { adminMiddleware } from "../middlewares/admin.js";

const orderRouter: Router = e.Router()

orderRouter.route('/')
    .get([authMiddleware], errorHandler(handleListOrders))
    .post([authMiddleware], errorHandler(handleCreateOrder))

orderRouter.route('/all')
    .get([authMiddleware, adminMiddleware], errorHandler(handleListAllOrders))

orderRouter.route('/user/:id')
    .get([authMiddleware, adminMiddleware], errorHandler(handleListUserOrdersById))

orderRouter.route('/:id')
    .get([authMiddleware], errorHandler(handleGetOrderById))
    .put([authMiddleware], errorHandler(handleCancelOrder))

orderRouter.route('/:id/status')
    .put([authMiddleware, adminMiddleware], errorHandler(handleChangeOrderStatus))

export default orderRouter