/**
* 
* @module routes/event
* @requires express
* @requires jsonwebtoken
* 
*/

import { Router } from 'express';
import { createCalendarEvent, deleteCalendarEvent } from '../../controllers/eventControllers.js';
import { requireAuth } from '../../middlewares/auth.js';
import validate from '../../middlewares/validator.js';
import { createPlaylistSchema } from '../../models/validationSchema.js';

const router = Router();


router.post('/create', requireAuth, validate(createPlaylistSchema), createCalendarEvent);


router.delete('/:id', requireAuth, deleteCalendarEvent);



export default router;