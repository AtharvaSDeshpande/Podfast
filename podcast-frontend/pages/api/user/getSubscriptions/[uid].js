import { Mongoose } from "mongoose";
import dbConnect from "../../../../db/dbconnect";
import User from "../../../../models/User";



//connecting to database
dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                User.findById(req.query.uid,{"salt": 0, "_password": 0}).populate({path: "subscriptions",model: "User"}).exec((err,result)=> {
                    if (err)
                    {
                        res.status(400).json({success: false, message: "No User Found"});
                    }
                    else
                    {
                        res.status(200).json({success: true, data: result})                        
                    }
                })
                
                
                
            }
            catch (error) {
                console.log("catch: "+ error);
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}