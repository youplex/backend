/**
 * 
 * @module models/Playlist
 * @requires mongoose
 * 
 */
 import mongoose from 'mongoose';

 /**
  * Playlist structure
  * @typedef {Object} Playlist
  * @property {string} title Title of the playlist
  * @property {string} description Description of the playlist
  * @property {string} playlistId playlistId of the playlist on platform
  * @property {string} createdBy userId of the user who created the playlist
  * @property {string} thumbnail thumbnail of playlist
  * @property {string} [platform="youtube"] platform on which the playlist is present 
  * @property {number} totalVideos total number of videos present in playlist 
  */
 
 
 /**
  * Playlist Schema
  * @constructor Playlist
  */
 const playlistSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    playlistId : {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String,
    },
    totalVideos: {
        type: Number,
        default: 0
    },
    platform: {
        type:String,
        default: 'youtube',
    },
 }, { timestamps: true });
 
 export default mongoose.model('Playlist', playlistSchema);