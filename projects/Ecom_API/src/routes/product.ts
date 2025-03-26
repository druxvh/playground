import express from "express";
import { errorHandler } from "../error-handler.js";
import { handleCreateProduct, handleDeleteProductById, handleGetProductById, handleListProducts, handleUpdateProductById } from "../controllers/product.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";

const productRouter = express.Router()

productRouter.route('/')
    .get([authMiddleware, adminMiddleware], errorHandler(handleListProducts))
    .post([authMiddleware, adminMiddleware], errorHandler(handleCreateProduct))

productRouter.route('/p/:id')
    .get([authMiddleware, adminMiddleware], errorHandler(handleGetProductById))
    .put([authMiddleware, adminMiddleware], errorHandler(handleUpdateProductById))
    .delete([authMiddleware, adminMiddleware], errorHandler(handleDeleteProductById))

export default productRouter