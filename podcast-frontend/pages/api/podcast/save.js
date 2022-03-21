import { SystemUpdate } from "@material-ui/icons";
import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import Save from "../../../models/SaveSchema";
import User from "../../../models/User";

var ObjectId = require('mongoose').Types.ObjectId;
let podcast,tags;

dbConnect();

//function to increase like
async function incLike(podcastID)
{
    // else increase the like of the podcast
    await Podcast.findByIdAndUpdate(podcastID,{ $inc: { likes: 1 }}).exec( async (err,doc)=>{
        console.log("inside increment")
        if(err)
        {
            res.status(400).send("Not able to update likes. Please try after some time\n"+ JSON.stringify(err));
        }
        else
        {               
            podcast = new Podcast(doc);
            //console.log(podcast);
            tags = podcast.tags;
            //console.log("tags: "+tags);
            console.log("hi")
        }
    });
}

//function to decrease like
async function unsave(podcastID,userID)
{
    // else increase the like of the podcast
    await User.findByIdAndUpdate(userID,{ $pull: { save: podcastID }}).exec( async (err,doc)=>{
        console.log("inside decrement")
        if(err)
        {
            console.log(err);
            //res.status(400).send("Not able to update likes. Please try after some time\n"+ JSON.stringify(err));
        }
        else
        {    
            console.log("deleted ");
            //res.status(400).send("Dislike");
        }
    });
}


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'PUT':
            try {

                var podcastID = (req.body.podcastID);
                var userID = (req.body.userID);

                console.log(podcastID);
                let saveObject = new Save(req.body);
                
                Save.find({podcastID: podcastID, userID: userID}).exec( async (err,doc) =>{
                    console.log(doc+" "+doc.length);
                    let saveID = doc._id;
                    //check if user already saved, if yes unsave and update
                    if(doc.length == 1)
                    {
                        console.log("already saved");
                        //unsave(doc._id,userID);
                        User.findByIdAndUpdate(userID,{ $pull: { "saved": saveID }}).exec( async (err,doc)=>{
                            console.log("inside decrement")
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {    console.log(doc);
                                console.log("deleted ");
                            }
                        });
                        Save.deleteOne({podcastID: podcastID, userID: userID});
                        res.status(400).json({success:false,message:"usave"});
                        res.end();
                    }
                    else
                    {
                        console.log("inside else condition");
                        console.log("userID: "+ userID);
                        
                        console.log(saveObject);
                        User.findByIdAndUpdate(userID,{ $push: { saved: saveObject._id }}).exec( async (err,doc)=>{
                            console.log("inside save podcast")
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {    
                                console.log("saved ");
                            }
                        });
                        Save.create(saveObject);
                        res.status(200).json({success:true,message:"saved"});
                        res.end();
                    }
                }); 
            }
            catch (error) {
                console.log("catch "+error);
                res.status(400).send({ success: false, message: error })
            }
            break;
        
        default:




    }
}