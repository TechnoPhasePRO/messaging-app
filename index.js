require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const specs = require('./src/docs/swagger');
const messageController = require('./src/controllers/messageController');
const protectedRoutes = require('./src/routes/protectedRoutes');
const groupChatRoutes = require('./src/routes/groupChatRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protectedRoutes);
app.use('/api', groupChatRoutes);
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('send message', async (data) => {
        try {
            await messageController.sendMessage(data);
            io.to(data.sender).emit('message', data);
            io.to(data.receiver).emit('message', data);
            if (data.groupId) {
                io.to(data.groupId).emit('group message', data);
            }
        } catch (error) {
            console.error('Error sending message via WebSocket', error);
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
