import { google } from 'googleapis';
import User from '../models/user.js';
import Event from '../models/event.js';
import getOAuthClient from '../utils/google.js';

const Calendar = google.calendar('v3');


export const createCalendarEvent = async (req, res) => {
    const { email = ''} = req.user || {};
    const { summary = '', description = '', start = '', end = '' } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "No User Found"});
        // setup up oauth client
        const OAuth2Client = getOAuthClient();
        OAuth2Client.setCredentials({ refresh_token: user.googleToken });

        const response = await Calendar.events.insert({
            auth: OAuth2Client,
            calendarId: 'primary',
            requestBody: {
                source: {
                    url: 'https://youplex.ml',
                    title: 'Youplex'
                },
                summary: summary,
                description: description,
                start: {
                    dateTime: new Date(start)
                },
                end: {
                    dateTime: new Date(end)
                },
                colorId: '6',
            }
        })
        const { id } = response.data;
        const event = await Event.create({
            eventId: id,
            summary,
            description,
            start,
            end,
            createdBy: user._id
        })
        res.json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};


export const deleteCalendarEvent = async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.params;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({message: "No User Found"});
       
        const event = await Event.findById(id);
        if(!event) return res.status(404).json({message: "No event Found"});
         // setup up oauth client
        const OAuth2Client = getOAuthClient();
        OAuth2Client.setCredentials({ refresh_token: user.googleToken });

        const response = await Calendar.events.delete({
            auth: OAuth2Client,
            calendarId: 'primary',
            eventId: event.eventId
        });
         res.json({ success: true }); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};
