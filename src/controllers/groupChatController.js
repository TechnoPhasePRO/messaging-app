const GroupChat = require('../models/GroupChat');

async function createGroupChat(req, res) {
    try {
        const { name, participants } = req.body;
        const groupChat = new GroupChat({ name, participants });
        await groupChat.save();
        res.status(201).json({ message: 'Group chat created successfully', groupChat });
    } catch (error) {
        console.error('Error creating group chat', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function joinGroupChat(req, res) {
    try {
        const groupId = req.params.groupId;
        const { userId } = req.body;
        const groupChat = await GroupChat.findById(groupId);
        if (!groupChat) {
            return res.status(404).json({ error: 'Group chat not found' });
        }
        groupChat.participants.push(userId);
        await groupChat.save();
        res.status(200).json({ message: 'User joined group chat successfully', groupChat });
    } catch (error) {
        console.error('Error joining group chat', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function leaveGroupChat(req, res) {
    try {
        const groupId = req.params.groupId;
        const { userId } = req.body;
        const groupChat = await GroupChat.findById(groupId);
        if (!groupChat) {
            return res.status(404).json({ error: 'Group chat not found' });
        }
        groupChat.participants = groupChat.participants.filter(participant => participant.toString() !== userId);
        await groupChat.save();
        res.status(200).json({ message: 'User left group chat successfully', groupChat });
    } catch (error) {
        console.error('Error leaving group chat', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createGroupChat, joinGroupChat, leaveGroupChat };
