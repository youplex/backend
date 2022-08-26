/**
 * 
 * @module routes/note
 * @requires express
 * 
 */

 import { Router } from 'express';
 import { requireAuth } from '../../middlewares/auth.js';
 
 import User from '../../models/user.js';
 import Note from '../../models/note.js';
 import Video from '../../models/video.js';
 
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
 router.get('/', requireAuth, async (req, res)  => {
    const { email = '' } = req.user || {};
    try {
     // check if user exists
     const user = await User.findOne({ email });
     if(!user) return res.status(404).json({message: "No User Found"});
 
     const notes = await Note.find({ createdBy: user._id })
     .sort({ createdAt: -1 }).populate('inPlaylist', '_id title')
     .populate('inVideo', 'id title');

     res.json(notes);
    } catch (error) {
         console.log(error);
         res.status(500).json(error); 
    } 
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
  router.get('/video', requireAuth, async (req, res)  => {
     const { email = '' } = req.user || {};
     const { id = ''  } = req.query;
     try{
         const video = await Video.findById(id);
         if(!video) return res.status(400).json({ message: "No such video exists"});
 
         const notes = await Note.find({ inVideo : id }).sort({ timestamp: 1 });
         res.json(notes);
     }catch(error){
         console.log(error);
         res.status(500).json(error); 
     }
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
 router.get('/:id', requireAuth, async (req, res)  => {
     const { id } = req.params;
     try{
         const note = await Note.findById(id);
         res.json(note);
     }catch(error){
         console.log(error);
         res.status(500).json(error); 
     }
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
  router.post('/create', requireAuth, async (req, res) => {
     const { email = '' } = req.user || {};
    const { title, content = "", timestamp , inPlaylist, inVideo, pageURL = '' } = req.body;
     try{
         // check if user exists
         const user = await User.findOne({ email });
         if(!user) return res.status(404).json({message: "No User Found"});
         const note = {
            title: title,
            content: content,
            timestamp: timestamp,
            createdBy: user._id,
            inPlaylist, 
            inVideo,
            pageURL
        };
      
        const newNote = await Note.create(note);
 
         res.json(newNote);
     }catch(error){
         console.log(error);
         res.status(500).json(error);  
     }
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
  router.put('/:id',  requireAuth, async (req, res) => {
     const { email = '' } = req.user || {};
     const { id } = req.params;
     const { title = '', content = '', timestamp } = req.body; 
     try {
         //  check if user exists
          const user = await User.findOne({ email });
          if(!user) return res.status(401).json({message: "No User Found"});
 
          const note = await Note.findByIdAndUpdate(
             { createdBy: user._id, _id: id },
             { $set: { title, content, timestamp }}, { new: true });
 
         res.json(note);
     } catch (error) {
         console.log(error);
         res.status(500).json(error);  
     }
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
  router.delete('/:id', requireAuth, async (req, res) => {
     const { id } = req.params;
     try {
         const note = await Note.findById(id);
         if(!note) return res.status(400).json({ message: "No such note exists"});
 
         await note.deleteOne();
         res.json({ success: true});
     } catch (error) {
         console.log(error);
         res.status(500).json(error);    
     }
 })
 
 export default router;