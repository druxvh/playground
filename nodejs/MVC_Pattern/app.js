import e from "express";
import { connectMongoDB } from "./config.js";
import { UserRouter } from "./routes/user.js";

const app = e()
const port = 3000

// DB Connection
connectMongoDB('mongodb://127.0.0.1:27017/test1')

// Middleware
app.use(e.urlencoded())

// User routes
app.use('/users', UserRouter)


app.listen(port, () => {
    console.log('Server listening')
})