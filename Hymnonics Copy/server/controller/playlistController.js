const Playlist = require('../models/playListSchema');
const { MongoClient, GridFSBucket } = require('mongodb');
const {mongoose} = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

exports.CreatePlaylist = async(req, res) => {
    try {
        const { name, token } = req.body;

        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const id = new mongoose.Types.ObjectId(payload.id);

        const user = await User.findById(id).populate("playlists").exec();
        const list = user.playlists;
        
        let flag = 0
        list.map((li) => {
            if(li.name === name){
                flag = 1;
                return;
            }
        })

        if(flag){
            return res.status(400).json({
                success: false,
                message: 'This Playlist Already Exits.'
            });
        }

        const user1 = await User.findById(id);
        const li = user1.playlists;

        try {
            await Playlist.create({name})
            .then( async createdPlaylist => {
                const updateduser = await User.findOneAndUpdate({_id : id}, {playlists: li.concat(createdPlaylist)}, {new: true});
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error In Creating New Playlist.'
            })
        }

        res.status(400).json({
            success: true,
            message: 'Playlist Created Successfully.'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong During Creating New Playlist.'
        })
    }
}

exports.FindSong = async(req, res) => {
    try {
        const db = client.db('Hymnonics');
        const bucket = new GridFSBucket(db);

        const file = await bucket.find({ filename: req.params.filename }).toArray();

        if(!file[0]){
            return res.status(400).json({
                success: false,
                message: 'This Song Not Avaiable.'
            })
        }
        res.status(200).json({
            success: true,
            data: file[0],
            message: 'Song Founded.'
        })
        
    } catch (error) {
        console.error(error);
        res.ststus(500).json({
            success: false,
            message: 'Something Went Wrong While Finding Song.'
        })
    }
}

exports.AddToPlaylist = async(req, res) => {
    try {
        
        let id = req.body;
        id = new mongoose.Types.ObjectId(id);

        const _id = req.params.playlist;

        const olist = await Playlist.findById(_id);

        const songexist = olist.songs.includes(id);
        if(songexist){
            return res.status(400).json({
                success: false,
                message: 'Song Already Exist In Playlist'
            })
        }

        const list = await Playlist.findByIdAndUpdate(_id, {songs: olist.songs.concat(id)}, {new : true});

        res.status(200).json({
            success: true,
            data: list,
            message: 'Song Added Successfully.'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong During Adding Song In Playlist.'
        })
    }
}

exports.PlaySong = async(req, res) => {
    try {
        const db = client.db('Hymnonics');
        const bucket = new GridFSBucket(db);

        const file = await bucket.find({ filename: req.params.filename }).toArray();

        if (file.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        res.set('Content-Type', 'audio/mp3');

        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        downloadStream.pipe(res);

    } catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: 'Something Went Wrong During Playing Song.'
        });
    }
}

exports.GetPlaylists = async(req, res) => {
    try {
        
        const token = req.params.token;

        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const id = new mongoose.Types.ObjectId(payload.id);

        const user = await User.findById(id).populate("playlists").exec();
        const list = user.playlists;

        let playlist = [];
        list.map(li => {
            playlist.push({name: li.name, id: li._id});
        })

        res.json({
            success: true,
            data: playlist,
            message: 'All Playlist Recived.'
        })

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error Founded.'
        })
    }
}

exports.GetSongs = async(req, res) => {
    try {
        const id = req.params.playlist;

        const list = await Playlist.findById(id);
        let array = [];
        await Promise.all(list.songs.map(async (song) => {
            const db = client.db('Hymnonics');
            const bucket = new GridFSBucket(db);

            const file = await bucket.find({_id: song}).toArray();
            array.push(file[0].filename);
        }));

        res.json({
            success: true,
            data: array,
            message: 'Songs Recived.'
        })

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error Found.'
        })
    }
}