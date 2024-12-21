const multer = require('multer');
const express = require('express');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const { UploadSong } = require('../controller/songController');
const { getSongsName } = require('../controller/songController');

router.post('/upload', upload.single('mp3'), UploadSong);
router.get('/getSongsName', getSongsName);

module.exports = router;