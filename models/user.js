/**
 * 
 * @module models/User
 * @requires mongoose
 * 
 */
import mongoose from 'mongoose';


/**
 *  Refresh Token Schema
 */
 const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: '',
    }
});


/**
 * User structure
 * @typedef {Object} User
 * @property {string} name Name of the user
 * @property {string} email Email id of the user
 * @property {URL} [image] user's profile image url
 * @property {string} [googleToken] google generated refresh token
 * @property {Array<object>} refreshTokens array of refresh tokens 
 * @property {boolean} calendarAccess calendar access granted status
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
    refreshTokens: {
        type: [Session],
    },
    googleToken : {
        type: String,
        required: true
    },
    calendarAccess: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);