import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import User from "../../../models/User";



dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'PUT':
            try {
                const pid = req.body.podcastID
                
                await Podcast.findByIdAndUpdate(pid,{isArchived: req.body.action}).exec((err,doc) => {
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({success: false, message: err});
                    }
                    else
                    {
                        res.status(200).json({success: true, message: "Archived"});
                    }
                })
                
            }
            catch (error) {
                console.log("catch "+error);
                res.status(400).send({ success: false, message: error })
            }
            break;
        
        default:




    }
}