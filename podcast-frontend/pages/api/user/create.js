import dbConnect from "../../../db/dbconnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
    const {method} = req

    switch (method) {
        case 'POST':
            try {
                const user = await User.create(req.body);
                console.log(user);
                res.status(200).json({success: true});
            }
            catch (error) {
                res.status(400).json({success: false,message: error})
            }
            break;
        default:

    
    
    
    }
}