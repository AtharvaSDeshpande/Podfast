import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useStateValue } from '../redux/StateProvider';
import { actionTypes } from '../redux/reducer';
import Post from './Post';


function CreatorProfile({ id }) {
    const [{ user, creatorspodcasts}, dispatch] = useStateValue();
    const [creator, setCreator] = useState();
    const [subscribed,setSubscribed] = useState(creator?.subscribers?.findIndex(id => {id == user._id}));

    const getUser = async (id) => {
        const res = await axios("../api/user/" + id);
        setCreator(res.data.data)
    }
    const getPodcasts = async () => {
        const res = await axios('../api/podcast/creator/' + id)
        console.log(res.data.data)
        dispatch({
            type: actionTypes.SET_CREATORSPODCASTS,
            creatorspodcasts: res.data.data
        })
    }
    useEffect(() => {
        if (id)
        {
            getUser(id)//.then(()=>{
                // console.log(creator.subscribers.findIndex(id => {id == user._id}))
            setSubscribed(creator?.subscribers?.findIndex(id => {id == user._id}))
            // });
            getPodcasts(id);
        }
    }, [id])

    const handleSubscription = async() => {
        const data = {
            creatorId: id,
            userId: user._id,
        }
        if (!subscribed)
        {
            
            const res = await axios("../api/user/subscribe",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(data),

            })
            if (res.data.success)
            {
                getUser(id).then(()=>{
                    setSubscribed(true)
                })
            }
        }
        else
        {
            const res = await axios("../api/user/subscribe",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),

            })
            if (res.data.success)
            {
                getUser(id).then(()=>{
                    setSubscribed(false)
                })
            }
        }
        
    }

    
  

    return (
        <div className='md:mx-auto grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl  py-3 mx-2'>
            <div className='col-span-3'>
                <div className="flex items-center justify-between  p-3  border-b-[1px] border-white ">
                    <div className='flex items-center'>
                        <Avatar style={{ backgroundColor: `${creator?.color}` }} className='capitalize'>{creator?.name[0]}</Avatar>
                        <div className="flex-1 mx-4">
                            <h2 className="font-bold text-white ">{creator?.email.split('@')[0]}</h2>
                            <h3 className="text-sm  text-white overflow-clip capitalize" >{creator?.name} </h3>
                        </div>
                    </div>
                    <div className='flex items-center'>

                    <div className=' w-fit m-0 p-2 flex flex-col text-center'>
                        <p>{creator?.subscribers.length}</p>
                        <p>Subscribers</p>
                    </div>
                    <button  className="font-semibold text-sm text-white p-1 bg-red-600 rounded-full" 
                             onClick={handleSubscription} >
                    {subscribed?(<p>Unsubscribe</p>):(<p>Subscribe</p>)}    
                    </button> 
                    </div>
                </div>
                <div>
                        {creatorspodcasts?.map((podcast) => (
                            <Post 
                            choice = "creatorProfile"
                            id={podcast._id} 
                            img={podcast.img} 
                            username={podcast.creatorID.email.split("@")[0]} 
                            name={podcast.creatorID.name} 
                            creatorColor={podcast.creatorID.color} 
                            caption={podcast?.description} 
                            link={podcast.url} 
                            summlink={podcast.summaryUrl} 
                            title={podcast.title} 
                            creators={podcast.creatorNames.join(", ")} 
                            likes={podcast.likes} 
                            views={podcast.views} 
                            categories={podcast?.categories} 
                            creatorID={podcast?.creatorID._id}
                            otherData={id}/>
                        ))}

                    </div>
            </div>

        </div>
    )
}

export default CreatorProfile