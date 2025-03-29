import { Request, Response } from "express";
import { prisma } from "../index.js";
import { AuthRequest } from "../types/types.js";

export async function handleCreateOrder(req: AuthRequest, res: Response) {
    const userId = Number(req.user?.id)

    // gets all the cart items of the user along with product & user details
    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId: userId
        },
        include: {
            product: true
        }
    })

    if (cartItems.length === 0) {
        res.status(400).json({ error: "Cart is empty" })
        return
    }

    // gets the total amt of the cart on the basis of product and their respective quantity
    const totalAmount = cartItems.reduce((prev, curr) => (
        prev + (curr.quantity * Number(curr.product.price))
    ), 0)

    // fetches user details in parallel
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { address: true }
    })

    if (!user?.address) {
        res.status(400).json({ error: "User address not found" });
        return
    }

    // Runs the queries in parallel | either succeed or fails (Follows ACID pattern)
    const [order] = await prisma.$transaction([

        // creates an order
        prisma.order.create({
            data: {
                userId: userId,
                userAddress: user.address,
                totalAmount: totalAmount,
                // appends the orderitems array with all the user's cart items
                orderItems: {
                    create: cartItems.map((cartItem) => {
                        return {
                            productId: cartItem.productId,
                            quantity: cartItem.quantity
                        }
                    })
                },
                status: "Pending"

            }
        }),

        // deletes the cart item
        prisma.cartItem.deleteMany({
            where: {
                userId: userId
            }
        })

    ])
    return res.status(200).json({ message: "Order created successfully", order })

}

export async function handleListOrders(req: AuthRequest, res: Response) {
    const userId = Number(req.user?.id)
    const orders = await prisma.order.findMany({ where: { userId: userId } })
    res.status(200).json(orders)

}

export async function handleCancelOrder(req: AuthRequest, res: Response) {
    const userId = Number(req.user?.id)
    const id = Number(req.params.id)

    try {
        // fetches order to check if it belongs to the user
        const order = await prisma.order.findUnique({
            where: { id: id },
            select: { userId: true }
        })
        if (!order) {
            res.status(400).json({ message: "Order not found" })
            return
        }

        if (order.userId !== userId) {
            res.status(400).json({ message: "Unauthorized: You can only cancel your own orders!" })
            return

        }

        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: { status: "Cancelled" }
        })
        res.status(200).json({ message: "Order cancelled succesfully", updatedOrder })

    } catch (error) {
        res.status(400).json({ message: "Error cancelling the order" })
    }
}

export async function handleGetOrderById(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {
        const order = await prisma.order.findFirstOrThrow({
            where: { id: id },
            include: { orderItems: true }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: "Error fetching the order" })
    }
}
