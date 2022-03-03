// import { Mongoose } from "mongoose";
// import dbConnect from "../../../db/dbconnect";
// import User from "../../../models/User";

// dbConnect();

// export default async (req, res) => {
//     const { method } = req

//     switch (method) {
//         case 'PUT':
//             try {
//                 User.updateOne({email:req.body.email},{$set: {saved:req.body.saved}});
//             }
//             catch(error)
//             {
//                 console.log(error)
//                 res.status(400).json({ success: false, message: error })

//             }
//             break;
        
//         default:




//     }
// }