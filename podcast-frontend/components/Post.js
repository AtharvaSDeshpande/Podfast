import { Tooltip } from "@material-ui/core";
import { Bookmark, BookmarkBorder, BookmarkBorderOutlined, Comment, Favorite, FavoriteBorder, FavoriteBorderOutlined, InsertEmoticon, PlayArrow, PlayCircleFilled, Send } from "@material-ui/icons";
import { useState } from "react";
function Post({ id, username, img, userImg, caption }) {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="bg-gradient-to-b from-black to-gray-900 text-white m-3  my-7 border rounded-sm p-3">
            <div className="flex flex-col items-center p-5 md:flex-row">
                <img src={userImg} className=" h-[180px] w-[180px] object-cover border  mr-3" alt="" />
                <div>
                    <div className="flex items-center p-5">
                        <img src={userImg} className="rounded-full h-12 w-12 object-contain border  mr-3" alt="" />
                        <p className="flex-1 font-bold ">{username}</p>
                        <Tooltip title="Play Summary"><PlayArrow className="w-9 h-9 cursor-pointer text-green-500" /></Tooltip>
                        <Tooltip title="Play Podcast">
                            < PlayCircleFilled className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {
                                setIsPlaying(true)
                            }} />
                        </Tooltip>

                    </div>




                    <div className="ml-5 h-20 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                        <p className="font-bold ">PODCAST TITLE</p>
                        <p className="  ">{caption}</p>
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
                    <BookmarkBorderOutlined className="btn" />
                </div>
                <div className="mx-5 mt-1 font-bold cursor-pointer">
                    2 Likes
                </div>
                <div className="mx-5 mt-1 break-word overflow-hidden overflow-ellipsis ">
                    <span className="font-bold mr-1">{username}</span>
                    <p>{caption}</p>
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


