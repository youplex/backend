/**
 * 
 * @module models/User
 * @requires mongoose
 * @requires bcrypt
 * 
 */
import mongoose from 'mongoose';

/**
 * @class User
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);