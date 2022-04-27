import { Mongoose } from "mongoose";
import dbConnect from "../../../db/dbconnect";
import Podcast from "../../../models/Podcast";
import User from "../../../models/User";

dbConnect();

const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: process.env.API_Key,
    consumer_secret: process.env.API_Key_Secret,
    access_token_key: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret,
})


export default async (req, res) => {
    console.log(1);
    try
    {
    const trends = await client.get('https://api.twitter.com/1.1/trends/place.json',{
        id: 2295412
    })
    const tags = trends[0].trends.map(trend=>{
        // console.log(trend)
        
        return {$regex: ".*" +  trend.name.toLowerCase() + ".*"}
    })
    console.log(tags)
   
    
    Podcast.find({
        "tags":  tags,
        "isArchived": false
    }).exec((err,op)=>{
        if (err)
        {
            console.log(err)
            res.status(400).json({success: false})

        }
        res.status(200).json({data: trends,tags: tags,podcasts: op})

    })
}
catch (err)
{
    console.log(err);
}
    
    // console.log(trends)
}