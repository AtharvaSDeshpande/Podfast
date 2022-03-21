import { SystemUpdate } from "@material-ui/icons";
import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import LikeSchema from "../../../models/LikeSchema";

var ObjectId = require('mongoose').Types.ObjectId;
let podcast, tags;

dbConnect();

//function to increase like
async function incLike(podcastID) {
    // else increase the like of the podcast
    await Podcast.findByIdAndUpdate(podcastID, { $inc: { likes: 1 } }).exec(async (err, doc) => {
        console.log("inside increment")
        if (err) {
            res.status(400).send("Not able to update likes. Please try after some time\n" + JSON.stringify(err));
        }
        else {
            podcast = new Podcast(doc);
            //console.log(podcast);
            tags = podcast.tags;
            //console.log("tags: "+tags);
            console.log("hi")
        }
    });
}

//function to decrease like
async function decLike(podcastID, userID) {
    // else increase the like of the podcast
    await Podcast.findByIdAndUpdate(podcastID, { $inc: { likes: -1 } }).exec(async (err, doc) => {
        console.log("inside decrement")
        if (err) {
            console.log(err);
            //res.status(400).send("Not able to update likes. Please try after some time\n"+ JSON.stringify(err));
        }
        else {
            //delete the document from userlikeschema also
            UserLikeSchema.deleteOne({ podcastID: podcastID, userID: userID }).exec((err, doc) => {
                console.log(doc);
            })
            console.log("deleted and decremented");
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
                console.log(userID);

                

                LikeSchema.find({ podcastID: podcastID, userID: userID }).exec(async (err, doc) => {
                    
                   

                    
                    //check if user already saved, if yes unsave and update
                    if (doc.length == 1) {
                        let likeID = doc[0]._id;
                        console.log("likeid = " + likeID)
                        console.log("already liked");
                        //unsave(doc._id,userID);
                        Podcast.findByIdAndUpdate(podcastID, { $pull: { "likes": likeID } }).exec(async (err, doc) => {
                            console.log("inside dislike")
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(doc);
                                console.log("deleted ");
                            }
                        });
                        LikeSchema.deleteOne(likeID).exec((err,res)=>{
                            if (err)
                            {
                                console.log(err)
                            }
                            else
                            {
                                console.log("deleted from likes collection")
                            }
                        });
                        res.status(400).json({ success: false, message: "dislike" });
                        res.end();
                    }
                    else {
                        let likeObject = new LikeSchema(req.body);
                        //push into podcast like array
                        await Podcast.findByIdAndUpdate(podcastID, { $push: { likes: likeObject._id } }).exec((err, doc) => {
                            if (err) {
                                res.status(400).json({ success: true, message: err });
                                res.end();
                            }
                            else {
                                LikeSchema.create(likeObject);
                                res.status(200).json({ success: true, message: "liked" });
                                res.end();
                            }
                        });
                    }

                });
            }
            // try {

            //     var podcastID = new ObjectId(req.body.podcastID);
            //     var userID = new ObjectId(req.body.userID);

            //     console.log(podcastID+"hi")


            //     UserLikeSchema.find({podcastID: podcastID, userID: userID}).exec( async (err,doc) =>{
            //         console.log(doc+" "+doc.length);
            //         let likeID = doc._id;
            //         //check if user already liked, if yes dislike and update
            //         if(doc.length == 1)
            //         {
            //             console.log("already liked");

            //             //remove from podcast like array
            //             await Podcast.findByIdAndUpdate(podcastID,{$pull:{"likes":likeID}}).exec((err,doc)=>{
            //                 if(err)
            //                 {
            //                     res.status(400).json({success:true,message:err});
            //                     res.end();
            //                 }
            //                 else
            //                 {
            //                     UserLikeSchema.deleteOne({_id:doc._id});
            //                     res.status(200).json({success:true,message:"disliked"});
            //                     res.end();
            //                 }
            //             });
            //             // decLike(podcastID,userID);
            //         }
            //         else
            //         {
            //             let likeObject = new UserLikeSchema(req.body);

            //             //push into podcast like array
            //             await Podcast.findByIdAndUpdate(podcastID,{$push:{likes:likeObject._id}}).exec((err,doc)=>{
            //                 if(err)
            //                 {
            //                     res.status(400).json({success:true,message:err});
            //                     res.end();
            //                 }
            //                 else
            //                 {
            //                     UserLikeSchema.create(likeObject);
            //                     res.status(200).json({success:true,message:"liked"});
            //                     res.end();
            //                 }
            //             });

            //             // console.log("inside else condition");
            //             // incLike(podcastID);
            //             // //update the userlikeschema collection
            //             // setTimeout( async() =>
            //             // {
            //             //     console.log(podcast);
            //             //     let likeObject = new UserLikeSchema({
            //             //         podcastID: new ObjectId(req.body.podcastID),
            //             //         userID: new ObjectId(req.body.userID),
            //             //         tags: tags
            //             //     })
            //             //     console.log(likeObject)
            //             //     UserLikeSchema.create(likeObject);
            //             //     res.status(200).json({ success: true,message: "Liked" });
            //             // },
            //             // 200);
            //         }
            //     }); 
            // }
            catch (error) {
                console.log("catch " + error);
                res.status(400).send({ success: false, message: error })
            }
            break;

        default:




    }
}