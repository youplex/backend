/**
 * Connect DB 
 * @module middlewares/connectDB
 * @requires mongoose
 * 
 * @description connectDB middleware  
 * connects the app to the mongo database
 * 
 */

import mongoose from 'mongoose';

/**
 * Creates connection to database
 * @function
 * 
 */
const connectDB = () => {

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => console.log('Connected to DB'))
    .catch(err => console.log(err));
}

export default connectDB;

