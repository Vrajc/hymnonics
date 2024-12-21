const express = require("express");
const cors = require('cors');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

require('./config/database').connect();

const user = require('./routes/user');
app.use('/api', user);

const song = require('./routes/song');
app.use('/admin', song);

const playlist = require('./routes/playlist');
app.use('/user', playlist);

app.listen(port, () => {
    console.log(`Server started at port ${port}.`);
});