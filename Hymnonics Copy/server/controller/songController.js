const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

exports.UploadSong = async(req, res) =>{
    try {
        const db = client.db('Hymnonics');
        const bucket = new GridFSBucket(db);
        const filename = req.file.originalname.toLowerCase();
    
        const file = await bucket.find({ filename: filename }).toArray();

        if(file[0]){
            return res.status(400).json({
                success: false,
                message: 'This Song Already Avaiable.'
            })
        }

        const fileData = fs.readFileSync(req.file.path);
    
        const uploadStream = bucket.openUploadStream(filename);
        const stream = fs.createReadStream(req.file.path);
    
        stream.pipe(uploadStream);

        await new Promise((resolve, reject) => {
          uploadStream.on('finish', resolve);
          uploadStream.on('error', reject);
        });

        fs.unlinkSync(req.file.path);

        res.send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getSongsName = async(req, res) => {
    try {
        const db = client.db('Hymnonics');
        const bucket = new GridFSBucket(db);

        const files = await bucket.find({}).toArray();

        if (!files.length) {
            return res.status(404).json({
                success: false,
                message: 'No songs found in the database.'
            });
        }

        const songNames = files.map(file => file.filename.slice(0,-4));

        res.status(200).json({
            success: true,
            songs: songNames
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}