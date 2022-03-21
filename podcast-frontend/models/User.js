const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');


const UserSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        
    },
    name:{
        type: String,
        required: true,
        maxlength:[200, 'Please keep real name short']
    },
    age: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        default: "red",
    },
    isCreator:{
        type: Boolean,
        default: false
    },
    _password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    podcasts: {
        type: Array,
        default: null,
    },
    saved: {
        type: Array,
        default: null,
        ref: "Podcast"
    },
    subscribers: {
        type: Array,
        default: null,
    },
    subscriptions: {
        type: Array,
        
        default: null,
    }

},{timestamps: true})
UserSchema.virtual("password")
    .set(function(password){
        this.salt = uuidv1();
        this._password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })
UserSchema.methods = {
    authenticate: function(simplePassword){
        return this.securePassword(simplePassword) === this._password;
    },
    securePassword: function (simplePassword)
    {
        if (!simplePassword) return null;
        try {
            return crypto.createHmac('sha256',this.salt).
            update(simplePassword).digest('hex');
        }
        catch (err)
        {
            return null;
        }
    }
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)