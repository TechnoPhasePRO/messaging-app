const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const apiDocumentation = require('../docs/user-api-docs');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/profile-picture', userController.updateProfilePicture);

module.exports = router;
