const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');
const apiDocumentation = require('../docs/groupChat-api-docs');

router.post('/create', groupChatController.createGroupChat);
router.put('/join/:groupId', groupChatController.joinGroupChat);
router.put('/leave/:groupId', groupChatController.leaveGroupChat);

module.exports = router;
