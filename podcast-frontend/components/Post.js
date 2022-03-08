import { Avatar, Tooltip } from "@material-ui/core";
import { Bookmark, BookmarkBorder, BookmarkBorderOutlined, Comment, Favorite, FavoriteBorder, FavoriteBorderOutlined, InsertEmoticon, PlayArrow, PlayCircleFilled, Send } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/StateProvider";
function Post({ id, username, name, title, img, userImg, caption: summary, link, summlink, creators }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [{ user }, dispatch] = useStateValue();
    /*
    const saveToDB = async () => {

        var i = user.saved.indexOf(id);
        if (i == -1) {
            user.saved.push(id);
        }
        else {
            user.saved.splice(i, 1);
        }
        try {

            const res = await axios('../api/user/savePodcast', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { email: user.email,saved: user.saved }

            })


        } catch (error) {


            console.log(error)
        }
    }
    */




    return (
        <div className=" bg-[#1f1e1e] text-white m-3  my-7 border rounded-sm p-3">
            <div className="flex flex-col items-center p-5 md:flex-row">
                <img src={img} className=" h-[180px] w-[180px] object-cover border  mr-3" alt="" />
                <div>
                    <div className="flex items-center p-5">
                        <Tooltip className="capitalize" title={name}>
                            <Avatar
                                alt=""
                                className={`h-10 w-10  uppercase bg-[#ff006a] m-2`}
                            >{username[0]}</Avatar>

                        </Tooltip>
                        <p className="flex-1 font-bold ">{username}</p>
                        <Tooltip title="Play Summary">
                            <PlayArrow className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {

                                dispatch({
                                    type: actionTypes.SET_URL,
                                    podcast: { title: title, creators: creators, url: summlink }
                                })
                            }} />
                        </Tooltip>
                        <Tooltip title="Play Podcast">
                            < PlayCircleFilled className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {
                                setIsPlaying(true)
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

            {isPlaying ? (<>

                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        <FavoriteBorderOutlined className="btn" />
                        <Comment className="btn" />
                        <Send className="btn -rotate-90" />


                    </div>
                    <BookmarkBorderOutlined className="btn"  />
                </div>
                <div className="mx-5 mt-1 font-bold cursor-pointer">
                    2 Likes
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


