/**
 * 
 * @module routes/playlist
 * @requires express
 * 
*/

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /playlist/:
 *   get:
 *     summary: Returns all playlist created by the user
 *     tags: [Playlist]
 *     responses:
 *       200:
 *         description: the data of the playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/playlist/', async () => {

});

/**
 * @swagger
 * /playlist/{id}:
 *   get:
 *     summary: Returns playlist data and videos in the playlist 
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: playlist id 
 *     responses:
 *       200:
 *         description: the list of the videos and playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     playlist:
 *                       type: object
 *                       description: playlist data
 *                     videos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: video data
 */
router.get('/playlist/:id', async () => {

});

/**
 * @swagger
 * /playlist/create:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playlistId:
 *                 type: string
 *                 description: playlistId from the platform{youtube}
 *     responses:
 *       200:
 *         description: The playlist was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/playlist/create', async () => {

});

/**
 * @swagger
 * /playlist/reorder:
 *   put:
 *     summary: reorders the videos in playlist by id
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         decsription: The playlist was reordered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: playlist was not found.
 *       500:
 *         description: Internal server error
 *
 */
router.put('/playlist/reorder', async () => {

})

/**
 * @swagger
 * /playlist/{id}:
 *   put:
 *     summary: updates playlist by id
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         decsription: The playlist was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: playlist was not found.
 *       500:
 *         description: Internal server error
 *
 */
router.put('/playlist/:id', async () => {

})

/**
 * @swagger
 *  /playlist/{id}:
 *    delete:
 *      summary: removes a playlist by id 
 *      tags: [Playlist]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: video id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The playlist was deleted
 *        404:
 *          description: The playlist was not found
 *
 */
 router.delete('/playlist/:id', async () => {

})


/**
 * @swagger
 *  /playlist/{playlistId}/{videoId}:
 *    delete:
 *      summary: removes a video from playlist by id 
 *      tags: [Playlist]
 *      parameters:
 *        - in: path
 *          name: playlistId
 *          description: playlist id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The video was deleted
 *        404:
 *          description: The video was not found
 *
 */
 router.delete('/playlist/:playlistId/:videoId', async () => {

})




export default router;