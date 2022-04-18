import dbConnect from '../../../../db/dbconnect';
import Podcast from '../../../../models/Podcast';

import SaveSchema from '../../../../models/SaveSchema';

dbConnect();

export default async (req, res) => {
    const { method } = req
    switch (method) {

        case 'GET':
            // const router = useRouter()
            const pid = req.query.pid
            console.log(pid);
            
            SaveSchema.find({ podcastID: pid }).exec((err, op) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ success: false, message: JSON.stringify(err) });

                }
                else {
                   
                    res.status(200).json({
                        success: true,
                        data: op
                    });
                }
                            


                
                
            })
            break
        default:
    }

}
