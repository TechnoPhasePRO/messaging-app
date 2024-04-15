/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Endpoints for sending and receiving messages
 */

/**
 * @swagger
 * /api/message/send:
 *   post:
 *     summary: Send a message
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageSend'
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /api/message/get:
 *   get:
 *     summary: Get messages
 *     tags: [Message]
 *     responses:
 *       '200':
 *         description: Messages retrieved successfully
 *       '404':
 *         description: No messages found
 */