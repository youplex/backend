/**
 * 
 * @module models/Video
 * @requires mongoose
 * 
 */
 import mongoose from 'mongoose';

 /**
  * Video structure
  * @typedef {Object} Video
  * @property {string} title Title of the video
  * @property {string} description Description of the video
  * @property {string} videoId videoId of the video on platform
  * @property {string} thumbnail thumbnail of video
  * @property {number} order order of video in the playlist
  * @property {boolean} completed completed state  
  * @property {string} inPlaylist Id of the playlist in which the video is present
  * @property {string} [platform="youtube"] platform on which the video is present 
  */
 
 
 /**
  * Video Schema
  * @constructor Video
  */
 const videoSchema = new mongoose.Schema({
     title: {
         type: String
     },
     description: {
         type: String
     },
     videoId : {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    inPlaylist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        required: true
    },
    thumbnail: {
        type: String,
    },
    platform: {
        type:String,
        default: 'youtube',
    },
 }, { timestamps: true });
 
 export default mongoose.model('Video', videoSchema);