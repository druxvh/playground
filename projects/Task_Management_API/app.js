import e from "express";
import { router } from "./routes/task.js";

const app = e()
const port = 3000

app.use(e.urlencoded())

app.use('/', router)

app.listen(port, () => {
    console.log('Server listening')
})