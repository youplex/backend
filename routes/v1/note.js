/**
 * 
 * @module routes/note
 * @requires express
 * 
 */

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /notes/:
 *   get:
 *     summary: Returns all notes created by the user
 *     tags: [Note]
 *     responses:
 *       200:
 *         description: the data of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/notes/', async (req, res)  => {
    
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Returns note data by id 
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: playlist id 
 *     responses:
 *       200:
 *         description: note data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 */
router.get('/notes/:id', async (req, res)  => {
    
});

/**
 * @swagger
 * /notes/video/{id}:
 *   get:
 *     summary: Returns note data by video id 
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: playlist id 
 *     responses:
 *       200:
 *         description: note data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 */
router.get('/notes/video/:videoId', async (req, res)  => {
    
});


/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Note]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The note was successfully created
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
 router.post('/notes/create', async () => {

});


/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: updates notes by id
 *     tags: [Note]
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
 router.put('/note/:id', async () => {

})


/**
 * @swagger
 *  /notes/{id}:
 *    delete:
 *      summary: removes a note by id 
 *      tags: [Note]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: note id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The note was deleted
 *        404:
 *          description: The note was not found
 *
 */
 router.delete('/notes/:id', async () => {

})

export default router;