import express from "express";

export const productRouter = express.Router()

productRouter.route('/')
.get()
.post() //admin only to add a new product

productRouter.route('/:id')
.get()
.put()
.delete()

