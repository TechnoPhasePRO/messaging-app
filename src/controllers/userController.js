const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../database/db');
const User = require('../models/User');
const { uploadProfilePicture } = require('../utils/upload');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        const db = await connectToDatabase();
        await db.collection('users').insertOne(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProfile(req, res) {
    try {
        const user = req.user;
        res.status(200).json({
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.error('Error getting user profile', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    try {
        const user = req.user;
        const { username, email } = req.body;
        user.username = username;
        user.email = email;
        await user.save();
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function updateProfilePicture(req, res) {
    try {
        const user = req.user; 
        uploadProfilePicture(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
                console.error('Multer error:', err);
                return res.status(400).json({ error: 'File upload error' });
            } else if (err) {
                console.error('Error uploading profile picture:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            user.profilePicture = req.file.location; 
            await user.save();
            res.status(200).json({ message: 'Profile picture updated successfully' });
        });
    } catch (error) {
        console.error('Error updating profile picture', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { register, login, getProfile, updateProfile, updateProfilePicture };
