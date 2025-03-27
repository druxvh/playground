import { z } from "zod";


export const CreateCartSchema = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive(),
})

export const ChangeQuantitySchema = z.object({
    quantity: z.number().positive(),
})