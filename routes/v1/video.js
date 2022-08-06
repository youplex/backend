/**
* 
* @module routes/user
* @requires express
* 
*/

import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import { deleteVideo, getSingleVideo } from '../../controllers/videoControllers.js';

const router = Router();

/**
 * @swagger
 * /video?{id}:
 *   get:
 *     summary: Returns video data by id
 *     tags: [Video]
 *     parameters:
 *       - in: query
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
 *                  title:
 *                   type: string
 *                  description:
 *                       type: string
 *                  videoId:
 *                       type: string
 *                  thumbnail:
 *                       type: string
 *                        
 */
router.get('/', getSingleVideo);

/**
 * @swagger
 * /video/{id}:
 *   delete:
 *     summary: Delete video by id
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: playlist id 
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                   type: boolean
 *                  
 */
router.delete('/:id', requireAuth, deleteVideo);

export default router;