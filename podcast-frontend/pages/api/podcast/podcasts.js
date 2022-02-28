import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import User from "../../../models/User";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {

                const podcast = await Podcast.find().populate({path: "creatorID"}).exec((err,op)=>{
                    if (err)
                    res.status(400).json({ success: false, message: error })
                    else
                    res.status(200).json({ success: true,
                        data: op});
                    
                });
                
                
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}