import { google } from 'googleapis';
import User from '../models/user.js';
import Playlist from '../models/playlist.js';
import Video from '../models/video.js';
const Youtube = google.youtube('v3');

export const getPlaylistData = async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.query;
    try {
        const user = await User.findOne({ email }).select('_id name');
        if(id){
            const playlist = await Playlist.findOne({ _id: id, createdBy: user._id });
            if(!playlist) return res.status(404).json({message: "No Playlist Found"});
            return res.json(playlist);
        }
        const playlists = await Playlist.find({ createdBy: user._id });
        res.json(playlists);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};

export const getVideosFromPlaylist = async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.query;
    try {
        // todo check if the user is the creator of the playlist
        const playlist = await Playlist.findById(id);
        if(!playlist) return res.status(404).json({message: "No Playlist Found"});

        const videos = await Video.find({ inPlaylist: playlist._id }).sort({ order: 1});
        res.json({ playlist, videos });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};


export const createNewPlaylist = async (req, res) => {
    const { listId = ''} = req.body;
    const { email = '' } = req.user || {};
    try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({message: "No User Found"});
        // check if the playlist already exists 
        //! high possibility this will be removed in future
        const playlist = await Playlist.findOne({ playlistId : listId, createdBy: user._id });
        if(playlist) return res.status(400).json({ message: "This playlist already exists" });

        const PLRes = await Youtube.playlists.list({
            auth: process.env.YOUTUBE_API_KEY,
            id: listId,
            part: 'snippet,contentDetails',
        });
        // extract useful data from response
        const data = getDataFromPlaylist(PLRes.data.items[0]);
        // create new Playlist
         const newPlaylist = await Playlist.create({...data, createdBy: user._id });

        const videos = [];

        const VdRes = await Youtube.playlistItems.list({
            key: process.env.YOUTUBE_API_KEY,
            playlistId: listId,
            part: 'snippet', // contentDetails  optional
            maxResults: 50
        });
        const v_data = getDataFromVideos(VdRes.data.items, { inPlaylist: newPlaylist._id });
        videos.push(...v_data);

        let { nextPageToken } = VdRes.data;
        while(nextPageToken){
            const VdRes = await Youtube.playlistItems.list({
                key: process.env.YOUTUBE_API_KEY,
                playlistId: listId,
                pageToken: nextPageToken,
                part: 'snippet', // contentDetails optional
                maxResults: 50
            });
            const v_data = getDataFromVideos(PLRes.data.items, { inPlaylist: newPlaylist._id });
            videos.push(...v_data);
            nextPageToken = VdRes.data.nextPageToken;
        }

        await Video.insertMany(videos);
        res.send(newPlaylist);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};