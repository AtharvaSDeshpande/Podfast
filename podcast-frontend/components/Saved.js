import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { actionTypes } from '../redux/reducer';
import { useStateValue } from '../redux/StateProvider'
import Post from './Post';

function Saved() {
  
  const [{user,savedpodcasts},dispatch] = useStateValue();
  // const [saved,setSavedPodcasts] = useState([]);

  const getSaved = async()=>{
    const res = await axios("../api/podcast/getSavedPodcasts/" + user._id,{
      method: "GET",
    })
    console.log(res.data.data)
    //  setSavedPodcasts(res.data.data)
    

     dispatch({
      type: actionTypes.SET_SAVEDPODCASTS,
      savedpodcasts: res.data.data,
    })
  }

  useEffect(()=>{
        getSaved();
        
        console.log(savedpodcasts)
   },[])

  const l = "ilhnilil"
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto py-3">
    <section className='md:col-span-2'>   {/* Section */}
        {/* Posts */}
        <div>
            {savedpodcasts?.map((podcast) => (
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
                      views = {podcast.podcastID.views}
                />
            ))}

        </div>
    </section>


   

</main>
  )
}

export default Saved