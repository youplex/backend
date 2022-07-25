/**
 * 
 * @module models/User
 * @requires mongoose
 * 
 */
import mongoose from 'mongoose';

/**
 * User structure
 * @typedef {Object} User
 * @property {string} name Name of the user
 * @property {string} email Email id of the user
 * @property {URL} [image] user's profile image url
 * @property {string} [googleToken] google generated refresh token 
 */


/**
 * User Schema
 * @constructor User
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    googleToken : {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);