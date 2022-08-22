/**
 * Exports all the auth related middlewares
 * @module middlewares/auth
 * @requires jsonwebtoken
 * 
 */

import jwt from 'jsonwebtoken';

/**
 * @constant {number} - specifies the validity of a refresh token in seconds
 */
export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60; // 30days

/**
 * @constant {number} - specifies the validity of a token in minutes
 */
export const ACCESS_TOKEN_EXPIRY = 24 * 60 * 60; // 1 day

/**
 * Cookie Options object
 * @typedef {Object} COOKIE_OPTIONS_TYPE
 * @property {boolean} httpOnly not accessible via client javascript
 * @property {boolean} secure only on secure connections
 * @property {boolean} signed 
 * @property {integer} maxAge time in milliseconds
 * @property {string} sameSite 
 */

/**
 * @constant {COOKIE_OPTIONS_TYPE} - specifies the cookie options that will be used
 */
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: +(REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none",
}


/**
 * @function getAccessToken
 * @description create a jwt token using the uid of user
 * @param {string} id specifices the uid of the user 
 * @returns {string} encrypted jwt token 
 */
export const getAccessToken = ( id ) => {
    const jwtToken =  jwt.sign(id, process.env.JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    return jwtToken;
}

/**
 * @function getRefreshToken
 * @description create a refresh token using the uid of user
 * @param {string} id specifices the uid of the user 
 * @returns {string} encrypted jwt token 
 */
export const getRefreshToken = ( id ) => {
    const refreshToken = jwt.sign(id, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return refreshToken
}

/**
 * @function requireAuth
 * @description middleware to check validity of jwt Token
 * @param {Object} req request object with data from client 
 * @param {Object} res response  
 * @param {callback} next  express middleware
 * @returns {callback} if successful moves to next middleware
 * 
 */
export const requireAuth = async (req, res, next) => {
    const token = req.headers["x-auth-token"];
    
    if(!token){
        return res.status(401).json({msg: "No Token Provided"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid Token", error });
    }
}

