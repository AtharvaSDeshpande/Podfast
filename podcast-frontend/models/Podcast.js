const mongoose = require("mongoose");

const PodcastSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    /*User name of creator */
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    creatorNames: {
        type: Array,
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
    likes: {
        type: Array,
        default: null,
    },
    views: {
        type: Array,
        default: null,
    },
    comments: {
        type: Array,
        default: null,
    },
    saves: {
        type: Number,
        default: 0,
    },
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