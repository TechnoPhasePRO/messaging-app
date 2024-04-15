const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/protected-route', authenticateToken, (req, res) => {
    const user = req.user;
    UserDataModel.findById(user.userId)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ error: 'User data not found' });
            }
            res.status(200).json(userData);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router;