const mongoose = require("mongoose");
const user = require('./User')
const SaveSchema = new mongoose.Schema({
    
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
        default: [],
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }

});

//create index
SaveSchema.index({podcastID:1,userID:1});

SaveSchema.pre('save', function(next){
    let now = new Date();
    this.updated_at = now;
    next();
});



module.exports = mongoose.models.Save || mongoose.model('Save', SaveSchema);