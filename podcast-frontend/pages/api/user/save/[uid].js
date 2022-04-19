

// import dbConnect from '../../../../db/dbconnect';
// import SaveSchema from '../../../../models/SaveSchema';

// dbConnect();

// export default async (req, res) => {
//     const { method } = req
//     switch (method) {
        
//         case 'GET':
//             // const router = useRouter()
//             const  uid  = req.query.uid
//             console.log(uid);
//             SaveSchema.find({userID: uid}).exec((err,op)=>{
//                 if (err)
//                     res.status(400).json({success: false, message: err});
//                 else
//                 {
//                     res.status(200).json({ success: true,
//                         data: op});
//                 }
//             })
//             break
//         default:
            
//     }
        
// }
        