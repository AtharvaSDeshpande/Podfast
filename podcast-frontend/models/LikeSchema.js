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
    updated_at: {
        type: Date, 
        default: Date.now
    }

});

//create index
LikeSchema.index({podcastID:1,userID:1});

// Sets the updates_at parameter equal to the current time
LikeSchema.pre('save', function(next){
    let now = new Date();
    this.updated_at = now;
    next();
});



module.exports = mongoose.models.likes || mongoose.model('likes', LikeSchema);