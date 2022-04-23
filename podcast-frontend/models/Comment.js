const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;

const CommentSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    comment:{
        type:String
    },
    timestamp:{
        type: Date, 
        default: Date.now
    },
    sentiment:{
        type: String
    }

});


// Sets the updates_at parameter equal to the current time
CommentSchema.pre('save', function(next){
    let now = new Date();
    this.updated_at = now;
    next();
});



module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)