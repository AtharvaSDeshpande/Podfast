import { useEffect, useState } from "react"
import { actionTypes } from "../../redux/reducer";
import { useStateValue } from "../../redux/StateProvider";
import Player from "../Player";
import Post from "./Post";

const axios = require('axios').default;


function Archived() {
    const [{user,archivedpodcasts},dispatch] = useStateValue();
    const getData = async () => {
        try {

            const res = await axios('../api/podcast/getArchivedPodcasts', {
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
                    type: actionTypes.SET_ARCHIVEDPODCASTS,
                    archivedpodcasts: podcasts
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
            <div className="flex flex-wrap justify-evenly">
                {archivedpodcasts?.map((podcast) => (
                <Post 
                id={podcast._id} 
                img={podcast.img} 
                username={podcast.creatorID.email.split("@")[0]} 
                name = {podcast.creatorID.name}  
                caption={l} link={podcast.url} 
                summlink={podcast.summaryUrl} 
                title = {podcast.title} 
                creators = {podcast.creatorNames.join(", ")} 
                likes = {podcast.likes} 
                views = {podcast.views}
                isArchived = {podcast.isArchived}/>
            ))}
            </div>
            
        <footer className="items-center   w-full  p-3 border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
            <Player />
        </footer>
        </div>
    )
}

export default Archived
