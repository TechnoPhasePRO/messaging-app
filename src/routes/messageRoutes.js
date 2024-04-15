const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const apiDocumentation = require('../docs/message-api-docs');

router.post('/send', messageController.sendMessage);

router.get('/get', messageController.getMessages);

module.exports = router;
