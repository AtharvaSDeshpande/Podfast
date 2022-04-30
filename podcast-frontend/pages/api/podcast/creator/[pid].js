import { Mongoose } from "mongoose";
import dbConnect from "../../../../db/dbconnect";
import Podcast from "../../../../models/Podcast";
import User from "../../../../models/User";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                console.log(req.query.pid)
                const podcast = await Podcast.find({creatorID: req.query.pid,isArchived: false}).sort({createdAt: "desc"}).populate({path: "creatorID"}).populate({path:"likes" }).exec((err,op)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }
                    else
                    res.status(200).json({ success: true,
                        data: op});
                    console.log(op);
                    
                });
                
                
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}