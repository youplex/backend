# Youplex Backend Docs

[Check Swagger Docs](https://youplex.herokuapp.com/docs/) 

Setting up backend server

clone repo

install dependencies
```
npm i 
```

create .env file
```
touch .env
```
add details in .env
```
OAUTH_CLIENT_ID = 
OAUTH_CLIENT_SECRET = 
OAUTH_REDIRECT_URI = 
MONGO_URI = 
YOUTUBE_API_KEY =
COOKIE_SECRET = 
JWT_ACCESS_SECRET = 
JWT_REFRESH_SECRET = 
WHITELISTED_DOMAINS = 
```

Start dev server - opens on port 5000
```
npm run dev
```

----
Implemented Routes

    Code docs  : /jsdocs
    Swagger (API) docs : /docs

### Base Url : http://localhost:5000/api/v1

1. Auth (all method post)
    1. login - /auth/login
    2. logout - /auth/logout
    3. refresh - /auth/refresh

2. Playlist
    1. get playlist (all) - /playlist
    2. get playlist by id -  /playlist?id=abcd1234
    3. update playlist - /playlist/{abcd1234}
    4. create playlist (post) - /playlist/create
    5. get videos in a playlist - /playlist/videos?id=abcd1234
    6. delete playlist - /playlist/{abcd1234}

3. User
    1. get user data - /user
    2. update user data (put) - /user

4. Video
    1. get single video - /video?id=abcd123
    2. delete video - /video/abcd123

5. Calendar Event
    1. create event (post) - /event/create
    2. delete event - /event/{abcd1234}




