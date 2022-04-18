import { Avatar, Tooltip } from "@material-ui/core";
import { Bookmark, BookmarkBorder, BookmarkBorderOutlined, Comment, Favorite, FavoriteBorder, FavoriteBorderOutlined, InsertEmoticon, PlayArrow, PlayCircleFilled, Send } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/StateProvider";
function Post({ id, username, name, title, img, userImg, caption: summary, link, summlink, creators, likes, views }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [{ user, savedpodcasts,podcast }, dispatch] = useStateValue();
    const a = []

    const [isLiked, setIsLiked] = useState((likes?.findIndex(like => like.userID === user._id) != -1))
    const getsavedPodcasts = savedpodcasts.filter(save => save.podcastID === id);

    const [isSaved, setIsSaved] = useState(((getsavedPodcasts?.findIndex(save => save.userID === user._id)) != -1))

    const updateSaveState = () =>{
        const getsavedPodcasts = savedpodcasts.filter(save => save.podcastID._id === id);
        // alert(((getsavedPodcasts?.findIndex(save => save.userID === user._id)) != -1)        )
        // console.log(getsavedPodcasts);
        setIsSaved(((getsavedPodcasts?.findIndex(save => save.userID === user._id)) != -1))

    }
    useEffect(() => {
        updateSaveState()
    }, [savedpodcasts])
    // alert(isSaved)
    const [likeIsDisabled, setLikeIsDisabled] = useState(false);
    const [saveIsDisabled, setSaveIsDisabled] = useState(false);

    // alert (isLiked)

    const handleSave = async (e) => {
        // console.log(e);
        // e.
        setSaveIsDisabled(true);
        try {
            const res = await axios('../api/user/updateSave', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { podcastID: id, userID: user._id }

            })
            
            
            try {
                const res = await axios("../api/podcast/getSavedPodcasts/" + user._id, {
                    method: "GET",
                })
                // console.log(res.data.data)
                dispatch({
                    type: actionTypes.SET_SAVEDPODCASTS,
                    savedpodcasts: res.data.data,
                })
                updateSaveState();
                
            }
            catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log(err)
        }
        setSaveIsDisabled(false);
    }
    const handleLike = async () => {
        setLikeIsDisabled(true);
        try {
            const res = await axios('../api/podcast/updatelike', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { podcastID: id, userID: user._id }

            })
            // const likes = res?.data?.data?.likes
            // console.log(likes);
            try {

                const res = await axios('../api/podcast/podcasts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },


                })
                const podcasts = res.data.data;
                const like = !isLiked;
                setIsLiked(like);
                dispatch({
                    type: actionTypes.SET_PODCASTS,
                    podcasts: podcasts
                })
                // console.log(posts)


            } catch (error) {


                console.log(error)
            }
        } catch (err) {
            console.log(err)
        }
        setLikeIsDisabled(false);
    }
    const playPodcast = async () => {
        setIsPlaying(true)
        dispatch({
            type: actionTypes.SET_URL,
            podcast: { id: id, title: title, creators: creators, url: link }

        })
        try {
            const res = await axios('../api/podcast/updateview', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { podcastID: id, userID: user._id }

            })
            // const likes = res?.data?.data?.likes
            // console.log(likes);
            try {

                const res = await axios('../api/podcast/podcasts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },


                })
                const podcasts = res.data.data;
                dispatch({
                    type: actionTypes.SET_PODCASTS,
                    podcasts: podcasts
                })
            } catch (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className=" bg-[#1f1e1e] text-white my-7 border rounded-sm p-3  m-10 md:m-3">
            <div className="flex flex-col items-center p-5 md:flex-row w-full">
                <img src={img} className=" h-[180px] w-[180px] object-cover border  mr-3" alt="" />
                <div className="w-full">
                    <div className=" flex justify-between items-center p-5">
                        <Tooltip className=" capitalize" title={name}>
                            <Avatar
                                alt=""
                                className={`h-10 w-10  uppercase bg-[#ff006a] m-2`}
                            >{username[0]}</Avatar>

                        </Tooltip>
                        <p className="flex-1 font-bold ">{username}</p>
                        <div>
                            {summlink != null ? (
                                <Tooltip title="Play Summary">
                                    <PlayArrow className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {

                                        dispatch({
                                            type: actionTypes.SET_URL,
                                            podcast: { id: id, title: title, creators: creators, url: summlink }
                                        })
                                    }} />
                                </Tooltip>
                            ) : null}

                            <Tooltip title="Play Podcast">
                                < PlayCircleFilled className="w-9 h-9 cursor-pointer text-green-500" onClick={playPodcast} />
                            </Tooltip>
                        </div>
                    </div>




                    <div className="ml-5 h-20 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                        <p className="font-bold capitalize">{title}</p>
                        <p className="  ">{summary}</p>
                    </div>

                </div>


            </div>

            {podcast.id === id ? (<>

                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        <button onClick={handleLike} disabled={likeIsDisabled}>
                            {isLiked ? (<Favorite className="btn text-[#f3027a]" />) : (<FavoriteBorderOutlined className="btn" />)}
                        </button>
                        <Comment className="btn" />
                        <Send className="btn -rotate-90" />


                    </div>
                    <button onClick={handleSave} disabled={saveIsDisabled}>
                        {isSaved ? (<Bookmark className="btn" />) : (<BookmarkBorderOutlined className="btn" />)}

                    </button>
                </div>
                <div className="mx-5 mt-1 font-bold cursor-pointer">
                {views?.length} Views and {likes?.length} Likes
                </div>
                <div className="mx-5 mt-1 break-word overflow-hidden overflow-ellipsis ">
                    <span className="font-bold mr-1">{username}</span>
                    <p>{summary}</p>
                </div>

                <form className="flex items-center p-4">
                    <InsertEmoticon className="h-7" />
                    <input type="text"
                        placeholder="Add a comment..."
                        className="border-none rounded-full  bg-auto mx-2 flex-1 focus:ring-0 outline-none items-center" />
                    <button className="font-semibold text-blue-600">Post</button>
                </form>
            </>) : null}


            {/* TODO: Comments */}





        </div>
    )
}

export default Post


