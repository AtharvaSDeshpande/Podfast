import { Mongoose } from "mongoose";
import dbConnect from "../../../../db/dbconnect";
import Podcast from "../../../../models/Podcast";
// import dbConnect from "../../../db/dbconnect";
// import Podcast from "../../../models/Podcast";
import User from "../../../../models/User";

dbConnect();


export default async (req, res) => {
    const { method } = req
    const skip = req.query.skip
    switch (method) {
        case 'GET':
            try {
                console.log(skip);
                const podcast = await Podcast.find({isArchived: false,isDeleted: false}).sort({createdAt: "desc"}).skip(skip).limit(20).populate({path: "creatorID"}).populate({path: "likes"}).exec((err,op)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }
                    
                    else
                    res.status(200).json({ success: true,
                        data: op});
                    // console.log(op)
                    
                });

                // console.log(podcast);
                
                
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}