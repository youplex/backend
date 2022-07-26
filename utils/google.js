/**
 * 
 * @module utils/google
 * @requires googleapis
 * 
 */

import { google } from 'googleapis';


/**
 * 
 * @returns {OAuth2Client} google OAuth2 Client
 */
const getOAuthClient = () => {
    const OAuth2Client = new google.auth.OAuth2({
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URI
    });

    return OAuth2Client;
}

export default getOAuthClient;

