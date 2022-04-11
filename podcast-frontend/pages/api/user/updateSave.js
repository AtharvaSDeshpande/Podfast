import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import SaveSchema from "../../../models/SaveSchema";
import User from "../../../models/User";


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
                SaveSchema.find({ podcastID: podcastID, userID: userID }).exec(async (err, doc) => {
                    //check if user already saved, if yes unsave and update
                    if (doc.length == 1) {
                        let saveID = doc[0]._id;
                        
                        //unsave(doc._id,userID);
                        User.findByIdAndUpdate(userID, { $pull: { "saved": saveID } }).exec(async (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(doc);
                                console.log("deleted ");
                            }
                        });
                        SaveSchema.findByIdAndDelete(saveID).exec((err, res) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("deleted from saves collection")
                            }
                        });
                        res.status(200).json({ success: true, message: "unsaved" });
                        res.end();
                    }
                    else {
                        let saveObject = new SaveSchema(req.body);
                        //push into podcast save array
                        await User.findByIdAndUpdate(userID, { $push: { saved: saveObject._id } }).exec((err, doc) => {
                            if (err) {
                                res.status(400).json({ success: true, message: err });
                                res.end();
                            }
                            else {
                                SaveSchema.create(saveObject);
                                res.status(200).json({ success: true, message: "saved" });
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
