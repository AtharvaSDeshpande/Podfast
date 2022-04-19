import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                console.log(req.body.email)
                await User.findByIdAndUpdate(req.body.id,{color: req.body.color}).exec((err,fdoc)=>{
                    if (err)
                    {
                res.status(400).json({ success: false, message: error })

                    }
                    else
                                    res.status(200).json({ success: true });

                });
                // console.log(user);
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        
        default:




    }
}