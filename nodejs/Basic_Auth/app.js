import e from "express";

// Basic Authentication is a simple authentication scheme built into the HTTP protocol. The client sends a username and password with every request, encoded in Base64.

const app = e()

app.use((req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Basic')) {
        return res.status(401).send('Unauthorized')
    }
    const base64Credentials = authHeader.split(" ")[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(":")

    if (username === 'admin' && password === 'password') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.get('/protected', (req, res) => {
    res.send('Authenticated!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});