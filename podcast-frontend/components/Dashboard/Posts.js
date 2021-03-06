import { useEffect, useState } from "react"
import { actionTypes } from "../../redux/reducer";
import { useStateValue } from "../../redux/StateProvider";
import Player from "../Player";
import Post from "./Post";

const axios = require('axios').default;


function Posts() {
    const [{user,uploadedpodcasts},dispatch] = useStateValue();
    const getData = async () => {
        try {

            const res = await axios('../api/podcast/myPodcasts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {id: user._id},

               

            })
            const podcasts = res.data.data;
            
            console.log(podcasts)
            dispatch(
                {
                    type: actionTypes.SET_UPLOADEDPODCASTS,
                    uploadedpodcasts: podcasts
                }
            )
            

        } catch (error) {


            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const l = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ut vero aspernatur cumque ipsa quam culpa ipsum sunt magni beatae totam sint cum labore ea, quis pariatur? Eum, porro harum?"

    return (
        <div>
            <div className="text-white text-center m-5">
                {uploadedpodcasts?.length == 0?(<p>
                   No results found!!! Upload New podcasts from the upload tab 
                </p>):(null)}

            </div>
            <div className="flex flex-wrap justify-evenly">
                {uploadedpodcasts?.map((podcast) => (
                <Post 
                id={podcast._id} 
                img={podcast.img} 
                username={podcast.creatorID.email.split("@")[0]} 
                name = {podcast.creatorID.name}  
                caption={podcast?.description}
                link={podcast.url} 
                summlink={podcast.summaryUrl} 
                title = {podcast.title} 
                creators = {podcast.creatorNames.join(", ")} 
                likes = {podcast.likes} 
                views = {podcast.views}
                isArchived = {podcast.isArchived}/>
            ))}
            </div>
            
        <footer className="items-center   w-full  p-3 border-neutral-900 border-b   text-white">
            <Player />
        </footer>
        </div>
    )
}

export default Posts
