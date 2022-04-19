import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";



//connecting to database
dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {

                console.log(req.query.uid)
                req.status(200).json({success: true})
                
                
            }
            catch (error) {
                console.log("catch: "+ error);
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}