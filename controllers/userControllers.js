import User from "../models/user.js";


export const getUserDetails = async (req, res) => {
    const { email = '' } = req.user || {};
    try {
        // get user details after removing sensitive data
        const user = await User.findOne({ email }).select('_id name email image calendarAccess');
         // check if user exists
        if(!user) return res.status(400).json({message: "No User Found"});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); 
    }
};


export const updateUserDetails = async (req, res) => {
    const { email = '' } = req.user || {};
    const { name, image } = req.body;
   try {
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { name, image } }, { new: true } )
        .select('_id name email image calendarAccess');
        // check if user exists
        if(!user) return res.status(400).json({message: "No User Found"});   
        res.json(user);
   } catch (error) {
        console.log(error);
        res.status(500).json(error); 
   } 
};