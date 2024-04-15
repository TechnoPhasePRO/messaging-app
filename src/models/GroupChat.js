const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
    name: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        imageUrl: String,
        videoUrl: String,
        attachmentUrl: String,
        timestamp: { type: Date, default: Date.now }
    }]
});

const GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChat;
