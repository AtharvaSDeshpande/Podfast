import { Avatar, Button, Tooltip } from "@material-ui/core";
import { Bookmark, BookmarkBorder, BookmarkBorderOutlined, Comment, Favorite, FavoriteBorder, FavoriteBorderOutlined, InsertEmoticon, PlayArrow, PlayCircleFilled, SaveSharp, Send } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { actionTypes } from "../../redux/reducer";
import { useStateValue } from "../../redux/StateProvider";
function Post({ id, username, name, title, img, userImg, caption: summary, link, summlink, creators, likes, views, isArchived }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [{ user }, dispatch] = useStateValue();
    const [saves, setSaves] = useState([]);

    const savedCount = async () => {
        const res = await axios("../api/podcast/getSavedPodcasts/" + id, {
            method: "GET"
        })
        setSaves(res.data.data);
    }
    useEffect(() => {
        savedCount();
    }, [])

    const archive = async () => {
        await axios('../api/podcast/archivePodcast', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            data: { podcastID: id, action: !isArchived },
        })
        try {
            const res = await axios('../api/podcast/myPodcasts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { id: user._id },
            })
            const podcasts = res.data.data;
            console.log(podcasts)
            dispatch(
                {
                    type: actionTypes.SET_UPLOADEDPODCASTS,
                    uploadedpodcasts: podcasts
                }
            )
        }
        catch (err) {
            console.log(err);
        }
        try {
            const res = await axios('../api/podcast/getArchivedPodcasts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { id: user._id },

            })
            const podcasts = res.data.data;
            dispatch(
                {
                    type: actionTypes.SET_ARCHIVEDPODCASTS,
                    archivedpodcasts: podcasts
                }
            )
        } catch (error) {

        }


    }
    return (
        <div className="bg-gradient-to-r from-black to-[#013374] text-white m-3  my-7 border rounded-sm p-3 w-[500px]">
            <div className="flex flex-col items-center p-5 md:flex-row">
                <img src={img} className=" h-[180px] w-[180px] object-cover border  mr-3" alt="" />
                <div>
                    <div className="flex items-center p-5">
                        <Tooltip title={name}>
                            <Avatar
                                alt=""
                                className={`h-10 w-10  uppercase bg-[#ff006a] m-2`}
                            >{username[0]}</Avatar>

                        </Tooltip>
                        <p className="flex-1 font-bold ">{username}</p>
                        {summlink != null ? (<Tooltip title="Play Summary">
                            <PlayArrow className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {
                                dispatch({
                                    type: actionTypes.SET_URL,
                                    podcast: { title: title, creators: creators, url: summlink }
                                })
                            }} />
                        </Tooltip>) : null}

                        <Tooltip title="Play Podcast">
                            < PlayCircleFilled className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {
                                // setIsPlaying(true)
                                dispatch({
                                    type: actionTypes.SET_URL,
                                    podcast: { title: title, creators: creators, url: link }

                                })
                            }} />
                        </Tooltip>

                    </div>




                    <div className="ml-5 h-20 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                        <p className="font-bold capitalize">{title}</p>
                        <p className="  ">{summary}</p>
                    </div>

                </div>


            </div>


            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <FavoriteBorderOutlined className="btn" />
                    <Comment className="btn" />


                </div>
                <BookmarkBorderOutlined className="btn" />
            </div>
            <div className="mx-5 mt-1 font-bold  flex justify-between text-neutral-500">
                <p>
                    {views?.length} Views and {likes?.length} Likes
                </p>
                <p>
                    {saves.length} Saves
                </p>
            </div>

            <div className="flex">
                <Button type="submit" variant="contained" color="secondary" className="m-1 w-full">Update</Button>
                <Button type="submit" variant="contained" color="secondary" className="m-1 w-full" onClick={archive}>{isArchived ? (<p>Restore</p>) : (<p>Archive</p>)}</Button>
                <Button type="submit" variant="contained" color="secondary" className="m-1 w-full">Delete</Button>

            </div>





        </div>
    )
}

export default Post


