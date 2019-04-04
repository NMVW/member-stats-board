# Poker Leaderboard Frontend (FWI)

## Global Dependencies
```npm v6.9.0```

## Install Dependencies
```$ npm install```

## Build & Serve
```$ npm start```
- `app.bundle.js` served at localhost:8765
- `[chunk].bundle.js` visualizer served at localhost:9998

## Stack
- **ReactJS** - View layer
- JS - CRUD API (in-memory data store)
- `localStorage` - Model layer (local cache)

__API__: To inspect key / value store, ```JSON.parse(localStorage.getItem('Player'))```

__Notes__: In a production build, assets in `src/assets` should be retrieved from a CDN endpoint instead of part of the app bundle.
