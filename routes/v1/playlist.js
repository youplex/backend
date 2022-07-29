/**
 * 
 * @module routes/playlist
 * @requires express
 * 
*/

import { Router } from 'express';
import { google } from 'googleapis';
import { requireAuth } from '../../middlewares/auth.js';
import User from '../../models/user.js';
import Playlist from '../../models/playlist.js';
import Video from '../../models/video.js';
import validate from '../../middlewares/validator.js';
import { getVideosSchema, playlistCreateSchema } from '../../models/validationSchema.js';
import { getDataFromPlaylist, getDataFromVideos } from '../../utils/youtube.js';

const router = Router();
const Youtube = google.youtube('v3');

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
 *       
 *              
 */
router.get('/', requireAuth, async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.query;
    try {
        const user = await User.findOne({ email }).select('_id name');
        if(id){
            const playlist = await Playlist.findOne({ _id: id, createdBy: user._id });
            if(!playlist) return res.status(404).json({message: "No Playlist Found"});
            return res.json(playlist);
        }
        const playlists = await Playlist.find({ createdBy: user._id });
        res.json(playlists);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
});

/**
 * @swagger
 * /playlist?{id}:
 *   get:
 *     summary: Returns playlist data and videos in the playlist 
 *     tags: [Playlist]
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
 *                     playlist:
 *                       type: object
 *                       description: playlist data
 *                     videos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: video data
 */
router.get('/videos', requireAuth, validate(getVideosSchema), async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.query;
    try {
        // todo check if the user is the creator of the playlist
        const playlist = await Playlist.findById(id);
        const videos = await Video.find({ inPlaylist: playlist._id }).sort({ order: 1});
        res.json(videos);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
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
router.post('/create', requireAuth, validate(playlistCreateSchema), async (req, res) => {
    const { listId = ''} = req.body;
    const { email = '' } = req.user || {};
    try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "No User Found"});
        // check if the playlist already exists 
        //! high possibility this will be removed in future
        const playlist = await Playlist.findOne({ playlistId : listId, createdBy: user._id });
        if(playlist) return res.status(400).json({ message: "This playlist already exists" });

        const PLRes = await Youtube.playlists.list({
            auth: process.env.YOUTUBE_API_KEY,
            id: listId,
            part: 'snippet,contentDetails',
        });
        // extract useful data from response
        const data = getDataFromPlaylist(PLRes.data.items[0]);
        // create new Playlist
         const newPlaylist = await Playlist.create({...data, createdBy: user._id });

        const videos = [];

        const VdRes = await Youtube.playlistItems.list({
            key: process.env.YOUTUBE_API_KEY,
            playlistId: listId,
            part: 'snippet', // contentDetails  optional
            maxResults: 50
        });
        const v_data = getDataFromVideos(VdRes.data.items, { inPlaylist: newPlaylist._id });
        videos.push(...v_data);

        let { nextPageToken } = VdRes.data;
        while(nextPageToken){
            const VdRes = await Youtube.playlistItems.list({
                key: process.env.YOUTUBE_API_KEY,
                playlistId: listId,
                pageToken: nextPageToken,
                part: 'snippet', // contentDetails optional
                maxResults: 50
            });
            const v_data = getDataFromVideos(PLRes.data.items, { inPlaylist: newPlaylist._id });
            videos.push(...v_data);
            nextPageToken = VdRes.data.nextPageToken;
        }

        await Video.insertMany(videos);
        res.send(newPlaylist);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
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
router.put('/reorder', async () => {

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
router.put('/:id', async () => {

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
 router.delete('/:id', async () => {

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
 *        - in: path
 *          name: videoId
 *          description: video id
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
 router.delete('/:playlistId/:videoId', async () => {

})




export default router;