import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
// import User from "../../models/User";
import Podcast from "../../../models/Podcast";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {
               
                const podcast = await Podcast.find({tags:  {$regex: '.*' + req.body.title + '.*'} }).sort({title: "asc",createdAt: "desc"}).populate({path: "creatorID"}).exec((err,op)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }
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