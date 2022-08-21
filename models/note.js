/**
 * 
 * @module models/Note
 * @requires mongoose
 * 
 */
 import mongoose from 'mongoose';

 /**
  * Note structure
  * @typedef {Object} Note
  * @property {string} [type="invideo"] Type of note
  * @property {Object} content content of the note 
  * @property {string} title title for the note 
  * @property {number} [timestamp] timestamp at which the note is created
  * @property {string} createdBy userId of the user who created the note
  * @property {string} [createdFor] mongoDB id of the document for which the note is created
  */
 
 
 /**
  * Note Schema
  * @constructor Note
  */
 const noteSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "invideo"
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdFor: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Video" 
        //!! leave ref and try querying vid, playlist one by one
    }
 }, { timestamps: true });
 
 export default mongoose.model('Note', noteSchema);