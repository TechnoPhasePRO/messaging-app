const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const messageController = require('./src/controllers/messageController');
const protectedRoutes = require('./src/routes/protectedRoutes');
const groupChatRoutes = require('./src/routes/groupChatRoutes'); 
const messageRoutes = require('./src/routes/messageRoutes'); 
const userRoutes = require('./src/routes/userRoutes'); 
const swaggerUi = require('swagger-ui-express');
const specs = require('./src/docs/swagger'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/api', protectedRoutes);
app.use('/api', groupChatRoutes); 
app.use('/api', userRoutes); 
app.use('/api', messageRoutes); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
});
