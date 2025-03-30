import { Request, Response } from "express";
import { prisma } from "../index.js";
import { ProductSchema } from "../schema/product.js";

export async function handleCreateProduct(req: Request, res: Response) {
    const validateProduct = ProductSchema.parse(req.body)

    if (!validateProduct) {
        res.status(400).json({ error: "Product validation error!" });
        return
    }

    const { name, description, price, category } = validateProduct

    const product = await prisma.product.create({
        data: {
            name: name,
            description: description,
            price: price,
            category: category
        }
    })

    res.status(200).json({ message: "Product added successfully!", product })
}

export async function handleUpdateProductById(req: Request, res: Response) {
    try {
        const productData = req.body

        const updateProduct = await prisma.product.update({
            where: { id: +req.params.id }, // '+' typecasts the string to a number
            data: productData
        })

        res.status(200).json({ message: "Product Updated Successfully!", updateProduct })

    } catch (error) {
        res.status(400).json({ message: "Something went wrong while updating the product!" })

    }
}
export async function handleDeleteProductById(req: Request, res: Response) {
    try {
        await prisma.product.delete({
            where: { id: +req.params.id } // '+' typecasts the string to a number
        })
        res.status(200).json({ message: "Product Deleted Successfully!" })

    } catch (error) {
        res.status(400).json({ message: "Something went wrong while deleting the product!" })
    }
}
export async function handleGetProductById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)

        const product = await prisma.product.findFirstOrThrow({
            where: { id: id }
        })

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Product Not Found!" });
    }
}

// for pagination
export async function handleListProducts(req: Request, res: Response) {
    try {
        const count = await prisma.product.count()

        const skip = Number(req.query.skip) || 0

        const products = await prisma.product.findMany({
            skip: skip,
            take: 10
        })
        res.status(200).json({
            count, data: products
        })
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
}

export async function handleSearchProducts(req: Request, res: Response) {
    const query = String(req.query?.q)

    const products = await prisma.product.findMany({
        where: {
            name: {
                search: query
            },
            description: {
                search: query
            },
            category: {
                search: query
            }
        }
    })

    res.status(200).json(products)

}