import jwt from 'jsonwebtoken';
import { COOKIE_OPTIONS, getAccessToken, getRefreshToken } from '../middlewares/auth.js';
import User from '../models/user.js';
import getOAuthClient from '../utils/google.js';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

export const loginUser = async (req, res) => {
    const { code = '' } = req.body;
    try {
        const OAuthClient = getOAuthClient();
        const response = await OAuthClient.getToken(code);
        // extract tokens and useful data from response
        const { tokens: { refresh_token: googleToken, id_token, scope = '' } = {} } = response;
        
        // check if user has granted calendar access
        const isCalendarGranted = (scope.split(' ').findIndex((sc) => sc === CALENDAR_SCOPE) !== -1);

        // get user info from id_token
        const userInfo = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());

        const user = await User.findOne({ email: userInfo.email });
        const [ jwtToken, refreshToken ] = [
                getAccessToken({ email : userInfo.email}),
                getRefreshToken({ email : userInfo.email})
            ];

        res.cookie('playlist_refresh', refreshToken, COOKIE_OPTIONS);
        // check if the user is new or logging in with new  device
        if(user){
            // add new refresh token for new device
            user.refreshTokens = [...user.refreshTokens, { refreshToken }];
            
            // update if calendar access has changed
            if(user.calendarAccess !== isCalendarGranted){
                user.calendarAccess = isCalendarGranted;
            }

            await user.save();
            const userData = { 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                image: user.image,
                calendarAccess: user.calendarAccess
            }
            return res.json({ token: jwtToken, user : userData });
        }

        const newUser = await User.create({
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.picture,
            refreshTokens: [{ refreshToken }],
            googleToken: googleToken,
            calendarAccess: isCalendarGranted
        });
        const userData = { 
            _id: newUser._id, 
            name: newUser.name, 
            email: newUser.email, 
            image: newUser.image,
            calendarAccess: newUser.calendarAccess
        }
        res.status(201).send({ new: true, token: jwtToken, user : userData });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};


export const refreshUserToken = async (req, res) => {
    const { signedCookies = {} } = req;
    const { playlist_refresh } = signedCookies;
    
    if(!playlist_refresh){
        return res.status(401).json({ message: "No Token Provided" });
    }
    
    try {
        const { email } = jwt.verify(playlist_refresh, process.env.JWT_REFRESH_SECRET);
        // check if user exists
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "No User Found"});

        // check if token is from the same user
        const tokenIndex = user.refreshTokens.findIndex(token => token.refreshToken === playlist_refresh);
        if(tokenIndex === -1){
            return res.status(401).json({message: "Invalid Token"});
        }
        // new tokens
        const [ jwtToken, refreshToken ] = [
            getAccessToken({ email }),
            getRefreshToken({ email })
        ];
        // Replacing the refreshToken in Database 
        user.refreshTokens[tokenIndex] = { "refreshToken": refreshToken};
        await user.save(); // Saving the user with updated refreshToken

        res.cookie('playlist_refresh', refreshToken, COOKIE_OPTIONS);
        res.json({ token: jwtToken, email: user.email });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};


export const logoutUser = async (req, res) => {
    const { signedCookies = {} } = req;
    const { playlist_refresh } = signedCookies;
    const { email = '' } = req.user;

    if(!playlist_refresh){
        return res.status(401).json({ message: "No Token Provided" });
    }

    try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "No User Found"});

        // check if token is from the same user
        const tokenIndex = user.refreshTokens.findIndex(token => token.refreshToken === playlist_refresh);
        if(tokenIndex === -1){
            return res.status(401).json({message: "Invalid Token"});
        }

        // remove the token from database
        await user.updateOne({ $pull: { refreshTokens: { refreshToken: playlist_refresh } }});
        // expire cookie
        res.cookie('playlist_refresh', '', { ...COOKIE_OPTIONS, maxAge: 1});
        res.json({ success: true , id: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }
};