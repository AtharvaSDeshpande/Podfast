import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { actionTypes } from '../redux/reducer';
import { useStateValue } from '../redux/StateProvider'
import Post from './Post';

function Saved() {
  
  const [{user},dispatch] = useStateValue();
  const [savedPodcasts,setSavedPodcasts] = useState([]);

  const getSaved = async()=>{
    const res = await axios("../api/podcast/getSavedPodcasts/" + user._id,{
      method: "GET",
    })
    console.log(res.data.data)
     setSavedPodcasts(res.data.data)
    
  }

  useEffect(()=>{
        getSaved();
   },[])

  const l = "ilhnilil"
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto py-3">
    <section className='md:col-span-2'>   {/* Section */}
        {/* Posts */}
        <div>
            {savedPodcasts?.map((podcast) => (
                <Post id={podcast.podcastID._id} 
                      img= {podcast.podcastID.img} 
                      username= {podcast.podcastID?.creatorID?.email?.split("@")[0]} 
                      name = {podcast.podcastID.creatorID.name}  
                      caption={l} 
                      link={podcast.podcastID.url} 
                      summlink={podcast.podcastID.summaryUrl} 
                      title = {podcast.podcastID.title} 
                      creators = {podcast.podcastID.creatorNames.join(", ")} 
                      likes = {podcast.podcastID.likes}
                />
            ))}

        </div>
    </section>


   

</main>
  )
}

export default Saved