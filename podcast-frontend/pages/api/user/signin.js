import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import User from "../../../models/User";
const jwt = require("jsonwebtoken");

dbConnect();

export default async (req, res) => {
    const { method } = req
    switch (method) {

        case 'POST':

            console.log(req.body);
            const { email, password } = req.body;

            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        err: err,
                    });
                }
                if (!user) {
                    return res.status(400).json({
                        err: "User Not Found",
                    });
                }
                if (!user.authenticate(password)) {
                    return res.status(401).json({
                        error: "Email and Password donot match",
                    });
                }

                const token = jwt.sign({ _id: user._id }, process.env.SECRET);
                // res.cookie("token", token, { expire: new Date() + 9999 });
                
                res.status(200).json({ token, user: user });
            });
            break;
        default:




    }
}
