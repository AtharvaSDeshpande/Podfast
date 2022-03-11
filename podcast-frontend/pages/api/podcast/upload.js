import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {

                const podcast = await Podcast.create(req.body);
                res.status(200).json({ success: true });
                
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}