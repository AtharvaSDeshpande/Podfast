import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import User from "../../../models/User";
// import Podcast from "../../../models/Podcast";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'PUT':
            try {

                await User.findByIdAndUpdate(req.body.id, { password: req.body.password }).exec((err, op) => {
                    console.log(req.body.id)
                    console.log(req.body.isCreator)
                    console.log(op)
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }
                    else

                        res.status(200).json({
                            success: true,
                            user: op
                        });

                });


            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;

        default:
    }
}