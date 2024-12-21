const mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["Customer", "Admin"],
        default: "Customer"
    },
    playlists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Playlist'
    }
})

module.exports = mongoose.model('User', UserSchema);