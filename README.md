# Messaging Application Backend

This project primarily focuses on the backend component of a messaging application developed using Node.js, Express.js, MongoDB, and Socket.IO. It contains necessary APIs and functionality to support real-time messaging between users, group chats, message encryption, user management.

## Features

- User Management:
  - User registration with username and password.
  - User login/authentication with JWT.
  - User profile management (update profile, profile picture).

- Messaging:
  - Sending and receiving messages between users.
  - Real-time messaging using WebSockets with Socket.IO.
  - Support for text, images, videos, and attachments.

- Group Chats:
  - Creating, joining, and leaving group chats.
  - Sending messages to group chats and receiving messages from other participants.

- Message Encryption:
  - End-to-end encryption for messages using AES.
  - Encryption and decryption of messages to ensure privacy and security.

## Project Structure

- `index.js`: Entry point of the application.
- `routes/`: Contains route definitions for different API endpoints.
- `controllers/`: Contains controller functions for handling business logic.
- `models/`: Contains MongoDB schema definitions for user profiles, messages, and group chats.
- `middlewares/`: Contains middleware functions, including authentication middleware.
- `config/`: Contains configuration files, including JWT secret key and database connection settings.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
2. Install dependencies:
   ```bash
    npm install
3. Set up environment variables:
   ```bash
    PORT=3000
    MONGODB_URI=<mongodb_url>
    JWT_SECRET_KEY=<jwt_token>
4. Start the server:
    ```bash
    npm start
5. Access the API at http://localhost:3000.

## API Documentation
The API documentation is available in the `docs/` directory. It includes details about each endpoint, its requests/responses, and postman collections.

## License
This project is licensed under the MIT License.
