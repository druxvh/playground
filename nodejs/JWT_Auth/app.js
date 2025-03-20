import e from "express";
import jwt from 'jsonwebtoken'

// Token Authentication involves issuing a token to the user after they log in. The token is then sent with each request to authenticate the user.

// JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is often used for token-based authentication.

const app = e();

app.use(e.json());
app.use(e.urlencoded())

const SECRET_KEY = 'your-secret-key';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.send(`Hello, ${decoded.username}`);
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});