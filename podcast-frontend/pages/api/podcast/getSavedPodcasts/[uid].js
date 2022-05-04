import dbConnect from '../../../../db/dbconnect';
import Podcast from '../../../../models/Podcast';

import SaveSchema from '../../../../models/SaveSchema';

dbConnect();

export default async (req, res) => {
    const { method } = req
    switch (method) {

        case 'GET':
            // const router = useRouter()
            const uid = req.query.uid
            console.log(uid);
            
            SaveSchema.find({ userID: uid }).populate({ path: "podcastID",isArchived: {$ne: true},populate: {path: "creatorID likes"}}).exec((err, op) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ success: false, message: JSON.stringify(err) });

                }
                else {
                   const saved = op.filter(podcast => podcast.podcastID.isArchived == false);
                    res.status(200).json({
                        success: true,
                        data: saved
                    });
                }
                            


                
                
            })
            break
        default:



    }

}
