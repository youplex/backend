/**
 * 
 * @module models/Event
 * @requires mongoose
 * 
 */
 import mongoose from 'mongoose';

 /**
  * Event structure
  * @typedef {Object} Event
  * @property {string} summary Summary 
  * @property {Object} description 
  * @property {string} eventId google event id
  * @property {Date} start start time of the event
  * @property {Date} end end time of the event
  * @property {string} createdBy userId of the user who created the note
  * 
  */
 
 
 /**
  * Event Schema
  * @constructor Event
  */
 const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
 }, { timestamps: true });
 
 export default mongoose.model('Event', eventSchema);