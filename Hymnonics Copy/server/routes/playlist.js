const express = require('express');
const router = express.Router();

const {CreatePlaylist, FindSong, AddToPlaylist, PlaySong, GetPlaylists, GetSongs} = require('../controller/playlistController');

router.post('/create_playlist', CreatePlaylist);
router.get('/findsong/:filename', FindSong);
router.post('/addsong/:playlist', AddToPlaylist);
router.get('/play/:filename', PlaySong);
router.get('/getplaylists/:token', GetPlaylists);
router.get('/getsongs/:playlist', GetSongs);

module.exports = router;