/**
 * @module index
 * @author Tayyab
 * @version 0.0.1
 */
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './middlewares/connectDB.js';
dotenv.config();

/**
 * @const {String} - Port on which the server runs
 */
const PORT = process.env.PORT || 5000;

/**
 * @constant {Array<string>} whitelist stores whitelist domain paths
 */
 const whitelist = process.env.WHITELISTED_DOMAINS
 ? process.env.WHITELISTED_DOMAINS.split(',')
 : []


const app = express();

app.use(cors({ origin: whitelist, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));