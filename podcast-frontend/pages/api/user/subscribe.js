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

                await User.findByIdAndUpdate(req.body.creatorId, { $addToSet: { subscribers: req.body.userId } }).exec((err, op) => {
                    console.log(req.body.id)
                    console.log(op)
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }

                });
                await User.findByIdAndUpdate(req.body.userId, { $addToSet: { subscriptions: req.body.creatorId } }).exec((err, op) => {
                    console.log(req.body.id)
                    console.log(op)
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }

                    else

                        res.status(200).json({
                            success: true,
                        });


                });


            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        case 'DELETE':
            try {

                await User.findByIdAndUpdate(req.body.creatorId, { $pull: { subscribers: req.body.userId } }).exec((err, op) => {
                    console.log(req.body.id)
                    console.log(op)
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }

                });
                await User.findByIdAndUpdate(req.body.userId, { $pull: { subscriptions: req.body.creatorId } }).exec((err, op) => {
                    console.log(req.body.id)
                    console.log(op)
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: err })
                    }

                    else

                        res.status(200).json({
                            success: true,
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