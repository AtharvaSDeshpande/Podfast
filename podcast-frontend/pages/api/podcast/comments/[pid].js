import { Mongoose } from "mongoose";
import dbConnect from "../../../../db/dbconnect";
import Podcast from "../../../../models/Podcast";
import Comment from "../../../../models/Comment";
import axios from 'axios';
var ObjectId = require('mongoose').Types.ObjectId;

//connecting to database
dbConnect();
async function insertComment(comment)
{
    //save new comment in comment collection
    Comment.create(comment,((err,doc)=>{
        if(err)
        {
            console.log("error updating the comment: "+err);
        }
        else
        {
            console.log("success ");
        }
    }));
    console.log(comment._id)
    const sentimentResponse = await axios.get("http://127.0.0.1:8000/growth-predict/"+comment._id);
    //const sentiment = await sentimentResponse.json();
    console.log(sentimentResponse.data);
    comment.sentiment = sentimentResponse.data;
    console.log(comment);
}

export default async (req, res) => {
    const { method } = req
    console.log("comments")

    const object = {
        userID: req.body.userID,
        comment: req.body.comment,
        created: req.body.timestamp
    }
    switch (method) {
        //put request is called for adding new comment
        case 'PUT':
            try {

               //create new comment object
               let comment = new Comment(req.body);
               console.log(comment);
               //insertComment(comment,req.query.pid)

               //push comment object in podcast comment array
               insertComment(comment);
               Podcast.findOneAndUpdate({_id:req.query.pid},{$push:{comments: comment._id}},((err,doc)=>{
                   if(err)
                   {
                       res.status(400).send("error updating the comment: "+err);
                       res.end();
                   }
                   else
                   {
                        // insertComment(comment).then(()=>{
                            res.status(200).send("succesfully added your comment: "+doc);
                        //     res.end();
                        // });
                        
                   }
               }));

               
                
            }
            catch (error) {
                res.status(400).send({ success: false, message: error })
            }
            break;

        //get requeest for getting all the comments for a specific podcast
        case 'GET':
            console.log("get");
            console.log(req.query.pid);
            Podcast.findById(req.query.pid).populate({path:"comments",populate:{path:"userID"}}).exec((err,doc)=>{
                if(err)
                {
                    console.log(err);
                    res.status(400).send(err);
                }
                else
                {
                    console.log(doc);
                    res.status(200).send({success:true,data:doc})
                }
                
            });
        
        default:


    }
}