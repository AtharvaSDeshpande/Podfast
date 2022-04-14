const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    
    podcastID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Podcast"
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: {
        type: Array,
        default: null,
    },
    

},{timestamps: true});




module.exports = mongoose.models.Like || mongoose.model('Like', LikeSchema);