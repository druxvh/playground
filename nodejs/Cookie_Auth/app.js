import e from "express";
import cookieParser from "cookie-parser";

// Cookie-Based Authentication involves storing the authentication token in a cookie.

const app = e()

app.use(cookieParser())

app.get('/login', (req, res) => {
    res.cookie('auth', 'user-token', { httpOnly: true })
    res.send('Logged In')
})

app.get('/', (req, res) => {
    if (req.cookies.auth === 'user-token') {
        res.send('Authenticated')
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});