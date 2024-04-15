/**
 * @swagger
 * tags:
 *   name: Group Chat
 *   description: Endpoints for managing group chats
 */

/**
 * @swagger
 * /api/groupchat/create:
 *   post:
 *     summary: Create a new group chat
 *     tags: [Group Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupChatCreation'
 *     responses:
 *       '200':
 *         description: Group chat created successfully
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /api/groupchat/join/{groupId}:
 *   put:
 *     summary: Join an existing group chat
 *     tags: [Group Chat]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group chat to join
 *     responses:
 *       '200':
 *         description: Successfully joined the group chat
 *       '404':
 *         description: Group chat not found
 */

/**
 * @swagger
 * /api/groupchat/leave/{groupId}:
 *   put:
 *     summary: Leave a group chat
 *     tags: [Group Chat]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group chat to leave
 *     responses:
 *       '200':
 *         description: Successfully left the group chat
 *       '404':
 *         description: Group chat not found
 */

