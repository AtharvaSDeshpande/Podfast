const mongoose = require("mongoose");
import CommentSchema from "../models/Comment";
import like from "./LikeSchema";

const PodcastSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    /*User name of creator */
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: {
        type: Array,
        default: null,
    },
    img: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e",
    },
    url: {
        type: String,
        required: true
    },
    textSummary: {
        type: String,
        default: null,
    },
    summaryUrl: {
        type: String,
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"likes",
        default: 0,
    }],
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"View"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }],
    saves: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
    }],
    isOnline: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    }

},{timestamps: true});


module.exports = mongoose.models.Podcast || mongoose.model('Podcast', PodcastSchema)