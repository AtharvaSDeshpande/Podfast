import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import ViewSchema from "../../../models/ViewSchema";
ViewSchema

dbConnect();

export default async (req, res) => {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                var podcastID = (req.body.podcastID);
                var userID = (req.body.userID);
                console.log(podcastID);
                console.log(userID);
                ViewSchema.find({ podcastID: podcastID, userID: userID }).exec(async (err, doc) => {
                    
                    if (doc.length == 0) {
                        let viewObject = new ViewSchema(req.body);
                        //push into podcast view array
                        await Podcast.findByIdAndUpdate(podcastID, { $push: { views: viewObject._id } }).populate({path: "views"}).exec((err, doc) => {
                            if (err) {
                                res.status(400).json({ success: true, message: err });
                                res.end();
                            }
                            else {
                                ViewSchema.create(viewObject);
                                res.status(200).json({ success: true, data: doc});
                                res.end();
                            }
                        });
                    }

                });
            }
            catch (error) {
                console.log("catch " + error);
                res.status(400).send({ success: false, message: error })
            }
            break;
        default:
    }
}