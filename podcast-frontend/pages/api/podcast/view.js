import View from "../../../models/ViewSchema"
import Podcast from "../../../models/Podcast";
import dbConnect from "../../../db/dbconnect";

//connecting to database
dbConnect();

async function insertView(view)
{
//View new comment in comment collection
    View.create(view,((err,doc)=>{
        if(err)
        {
            console.log("error updating the comment: "+err);
        }
        else
        {
            console.log("success ");
        }
    }));
}

export default async (req, res) => {
    const { method } = req

    console.log("views")

    switch (method) {
        //put request is called for adding views
        case 'PUT':
            try {

               //create new comment object
               let view = new View(req.body);
               console.log(view);

               //push comment object in podcast comment array

               Podcast.findOneAndUpdate({_id:req.body.podcastID},{$push:{views: view._id}},((err,doc)=>{
                   if(err)
                   {
                       res.status(400).send("error updating the comment: "+err);
                       res.end();
                   }
                   else
                   {
                        insertView(view);
                        res.status(200).send("succesfully added your comment: "+doc);
                        res.end();
                   }
               }));

               
                
            }
            catch (error) {
                res.status(400).send({ success: false, message: error })
            }
            break;

        //get request for getting all the comments for a specific podcast
        case 'GET':
            console.log("get");
            console.log(req.headers.podcastid);
            Podcast.findById(req.headers.podcastid).populate("views").exec((err,doc)=>{
                if(err)
                {
                    res.status(400).send(err);
                }
                else
                {
                    console.log(doc);
                    res.status(200).send({success:true})
                }
                
            });
        
        default:


    }
}