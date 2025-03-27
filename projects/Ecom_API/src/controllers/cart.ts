import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart.js";
import { prisma } from "../index.js";
import { AuthRequest } from "../types/types.js";

export async function handleAddItemToCart(req: AuthRequest, res: Response) {

    try {
        const validateData = CreateCartSchema.parse(req.body)

        const userId = req.user?.id!

        // check if product exists
        const product = await prisma.product.findFirstOrThrow({
            where: { id: validateData.productId }
        })

        // check if product exists in the user's cart
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: userId,
                productId: product.id,
            }
        })

        let cartItem;

        if (existingCartItem) {

            // if exists, increase quantity
            cartItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + validateData.quantity }
            })

            res.status(200).json({ message: "Cart updated and product added!", cartItem })



        } else {
            // create a new cart item
            cartItem = await prisma.cartItem.create({
                data: {
                    userId: userId,
                    productId: product.id,
                    quantity: validateData.quantity
                }
            })

            res.status(200).json({ message: "Cart created and product added!", cartItem })
        }

    } catch (error) {
        res.status(400).json({ message: "Something went wrong!" })
    }
}

export async function handleDeleteItemFromCart(req: AuthRequest, res: Response) {
    // finds the cart of the user
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: Number(req.params.id),
            userId: req.user?.id
        }
    })

    if (!cartItem) {
        res.status(400).json({ message: "Unauthorized: Cannot delete this item." })
    }

    // if exists, deleted the item from the user's cart
    await prisma.cartItem.delete({
        where: { id: cartItem?.id }
    })

    res.status(200).json({ message: "Product removed from cart." })
}

export async function handleChangeQuantity(req: AuthRequest, res: Response) {

    const validateData = ChangeQuantitySchema.parse(req.body)

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: Number(req.params.id),
            userId: req.user?.id
        }
    })

    if (!cartItem) {
        res.status(400).json({ message: "Cart item not found!" })
        return
    }

    const updatedCart = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: validateData.quantity }
    })

    res.status(200).json({ message: "Product quantity updated!", updatedCart })

}

export async function handleGetCart(req: AuthRequest, res: Response) {

    const cart = await prisma.cartItem.findMany({
        where: {
            userId: req.user?.id
        },
        include: {
            product: true,
        }
    })

    if (!cart) {
        res.status(400).json({ message: "Cart item not found!" })
        return
    }

    res.status(200).json(cart)
}