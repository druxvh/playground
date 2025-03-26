import { NextFunction, Request, Response } from "express";

export function errorHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next)
        } catch (error) {
            res.status(400).json({ message: "Something went wrong!", Error: error })
        }
    }
}