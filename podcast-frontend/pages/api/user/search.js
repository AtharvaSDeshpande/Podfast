import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import User from "../../../models/User";
// import Podcast from "../../../models/Podcast";

dbConnect();


export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {

                const user = await User.find(
                    {
                        $or: [
                            { name: { $regex: '.*' + req.body.title + '.*' } },
                            { email: { $regex: '.*' + req.body.title + '.*' } }
                        ]
                    }).exec((err, op) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ success: false, message: err })
                        }
                        else
                            res.status(200).json({
                                success: true,
                                data: op
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