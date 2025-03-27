import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { errorHandler } from "../error-handler.js";
import { handleAddItemToCart, handleChangeQuantity, handleDeleteItemFromCart, handleGetCart } from "../controllers/cart.js";

const cartRouter = express.Router()

cartRouter.route('/')
    .get([authMiddleware], errorHandler(handleGetCart))
    .post([authMiddleware], errorHandler(handleAddItemToCart))

cartRouter.route('/:id')
    .put([authMiddleware], errorHandler(handleChangeQuantity))
    .delete([authMiddleware], errorHandler(handleDeleteItemFromCart))

export default cartRouter