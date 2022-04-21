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
        id: 1//2295412
    })
res.status(200).json({data: trends})
}
catch (err)
{
    console.log(err);
}
    
    // console.log(trends)
}