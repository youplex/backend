# Playlist Management Backend Docs

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

1. Auth (all method post)
    1. login - http://localhost:5000/api/v1/auth/login
    2. logout - http://localhost:5000/api/v1/auth/logout
    3. refresh - http://localhost:5000/api/v1/auth/refresh

2. Playlist
    1. get playlist (all) - http://localhost:5000/api/v1/playlist
    2. get playlist by id -  http://localhost:5000/api/v1/playlist?id=abcd1234
    3. create playlist (post) - http://localhost:5000/api/v1/playlist/create
    4. get videos in a playlist - http://localhost:5000/api/v1/playlist/videos?id=abcd1234

3. User
    1. get user data - http://localhost:5000/api/v1/user/
    2. update user data (put) - http://localhost:5000/api/v1/user/




