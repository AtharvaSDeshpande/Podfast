// import { Mongoose } from "mongoose";
// import dbConnect from "../../../db/dbconnect";
// import LikeSchema from "../../../models/LikeSchema";

// const jwt = require("jsonwebtoken");

// var ObjectId = require('mongoose').Types.ObjectId;

// //connecting to database
// dbConnect();

// export default async (req, res) => {
//     const { method } = req

//     switch (method) {
//         case 'GET':
//             try {

//                 console.log(req.query.uid)
//                 var userID = new ObjectId(req.query.uid);
//                 console.log(userID);

//                 const podcast = await UserLikeSchema.find({userID: userID}).exec((err,doc)=>{
//                     if (err)
//                     {
//                         console.log(err);
//                         res.status(400).json({ success: false, message: err })
//                     }
//                     else
//                     res.status(200).json({ success: true,data: doc});
//                     console.log(doc);
//                 });
                
                
//             }
//             catch (error) {
//                 console.log("catch: "+ error);
//                 res.status(400).json({ success: false, message: error })
//             }
//             break;
        
//         default:




//     }
// }