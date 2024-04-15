const bcrypt = require('bcrypt');

async function register(req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { register };
