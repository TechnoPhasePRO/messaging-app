const { encryptMessage, decryptMessage } = require('../utils/encryption');
const Message = require('../models/Message');

async function sendMessage(req, res) {
    try {
        const { sender, receiver, text, imageUrl, videoUrl, attachmentUrl } = req.body;
        const encryptionKey = process.env.JWT_SECRET_KEY;
        const encryptedText = encryptMessage(text, encryptionKey);
        const message = new Message({
            sender,
            receiver,
            text: encryptedText,
            imageUrl,
            videoUrl,
            attachmentUrl
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getMessages(req, res) {
    try {
        const { sender, receiver } = req.query;
        const messages = await Message.find({ sender, receiver }).sort({ timestamp: 1 });
        const decryptionKey = 'messagekey';
        const decryptedMessages = messages.map(message => {
            const decryptedText = decryptMessage(message.text, decryptionKey);
            return { ...message.toObject(), text: decryptedText };
        });
        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error('Error getting messages', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { sendMessage, getMessages };
