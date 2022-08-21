import Video from '../models/video.js';
import Playlist from '../models/playlist.js';
import User from '../models/user.js';


export const getSingleVideo = async (req, res) => {
    const { id } = req.query;
    try {
        const video = await Video.findById(id);
        if(!video) return res.status(404).json({message: "No Video Found"});
        res.json(video);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};


export const updateVideo = async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({message: "No User Found"});

    const video = await Video.findById(id);
    if(!video) return res.status(404).json({message: "No Video Found"});
    // get the playlist in which the video is present
    const playlist = await Playlist.findById(video.inPlaylist);
 
    // check if the user is deleting their own video
    if(playlist.createdBy.toString() !== user._id.toString()){
        return res.status(401).json({message: "Not Allowed"});
    }

    const updatedVideo = await Video.findOneAndUpdate(
        { _id: id }
        , { $set: { title, description, completed } }, { new: true });
    
    await playlist.updateOne({ $inc: { completedVideos : (updatedVideo.completed ? 1 : -1) }});

    res.json(updateVideo);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const deleteVideo = async (req, res) => {
    const { email = '' } = req.user || {};
    const { id } = req.params;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "No User Found"});

        const video = await Video.findById(id);
        if(!video) return res.status(404).json({message: "No Video Found"});

        // get the playlist in which the video is present
        const playlist = await Playlist.findById(video.inPlaylist);

        // check if the user is deleting their own video
        if(playlist.createdBy.toString() !== user._id.toString()){
            return res.status(401).json({message: "Not Allowed"});
        }
        
        // delete the video
        await video.deleteOne();
        // update playlist totalvideos property
        await playlist.updateOne({ $inc: { totalVideos: -1 }});
        // update order of videos after the deleted video in playlist
        const videosAfterDeleted = await Video.updateMany(
            { inPlaylist: playlist._id, order: { $gt: video.order }},
            { $inc: { order: -1 }}
        );

        res.json({ success: true });
    }catch(error){
        console.log(error);
        res.json(error);
    }
}; 

