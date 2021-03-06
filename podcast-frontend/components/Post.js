import { Avatar, Tooltip } from "@material-ui/core";
import { Bookmark, BookmarkBorder, BookmarkBorderOutlined, Comment, Favorite, FavoriteBorder, FavoriteBorderOutlined, InsertEmoticon, PlayArrow, PlayCircleFilled, Send } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/StateProvider";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputEmoji from "react-input-emoji";
import { useRouter } from "next/router";

function Post({ choice, id, username, name, title, img, userImg, caption: summary, link, summlink, creators, likes, views, creatorColor, categories = null, creatorID ,otherData = null}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [{ user, savedpodcasts, podcast }, dispatch] = useStateValue();
    const a = []

    const [isLiked, setIsLiked] = useState((likes?.findIndex(like => like.userID === user._id) != -1))
    const getsavedPodcasts = savedpodcasts.filter(save => save.podcastID === id);

    const [isSaved, setIsSaved] = useState(((getsavedPodcasts?.findIndex(save => save.userID === user._id)) != -1))
    const [commentInput, setCommentInput] = useState("");

    const updateSaveState = () => {
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

    const updateReducer = async (button) => {
        switch (choice) {
            case "posts": {
                try {

                    const res = await axios('../api/podcast/getSubscribedPodcasts/' + user._id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                    const podcasts = res.data.data;
                    if (button == "like") {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                        type: actionTypes.SET_PODCASTS,
                        podcasts: podcasts
                    })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case "searched": {
                try {

                    const res = await axios('../api/podcast/search', {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      data: { title: otherData.toLowerCase() }
              
                    })
                    const podcasts = res.data.data;
                    // console.log(podcasts)
                    if (button == "like")
                    {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                      type: actionTypes.SET_SEARCHPODCASTS,
                      searchedpodcasts: podcasts
                    })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case "searchedOnTags": {
                try {
                    const tagsres = await axios('../api/podcast/searchOnTags', {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        data: { title: otherData.toLowerCase()  }
                
                      })
                      const podcastsOnTags = tagsres.data.data;
                      
                      
                    // console.log(podcasts)
                    if (button == "like")
                    {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                        type: actionTypes.SET_SEARCHONTAGSPODCASTS,
                        searchedontagspodcasts: podcastsOnTags
                      })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case "recommended": {
                try {

                    const res = await axios("../api/podcast/getRecomendedPodcasts/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        data: { ids: otherData }
                      })
                    //   console.log(res.data.data)
                    if (button == "like") {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                        type: actionTypes.SET_RECOMMENDEPODCASTS,
                        recommendedpodcasts: res.data.data
                      })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case "creatorProfile": {
                try {

                    const res = await axios('../api/podcast/creator/' + otherData)
       
       
                    //   console.log(res.data.data)
                    if (button == "like") {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                        type: actionTypes.SET_CREATORSPODCASTS,
                        creatorspodcasts: res.data.data
                    })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case "saved": {
                try {
                    
                    const res = await axios("../api/podcast/getSavedPodcasts/" + otherData,{
                        method: "GET",
                      })
                      
                      
                    //   console.log(res.data.data)
                    if (button == "like") {
                        const like = !isLiked;
                        setIsLiked(like);
                    }
                    dispatch({
                        type: actionTypes.SET_SAVEDPODCASTS,
                        savedpodcasts: res.data.data,
                      })
                    // console.log(posts)
                } catch (error) {
                    console.log(error)
                }
                break;
            }
        }

    }

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

            updateReducer("like")
        } catch (err) {
            console.log(err)
        }
        setLikeIsDisabled(false);
    }
    const playPodcast = async () => {
        setIsPlaying(true)
        dispatch({
            type: actionTypes.SET_URL,
            podcast: { id: id, title: title, creators: creators, url: link, img: img }

        })
        try {
            const res = await axios('../api/podcast/updateview', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: { podcastID: id, userID: user._id }

            })

            updateReducer("view")
        } catch (err) {
            console.log(err)
        }
    }
    const getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: '50%',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],

        },


    }));
    const router = useRouter();
    const loadComments = async () => {
        //console.log(id);
        const res = await axios("../api/podcast/comments/" + id, {
            method: "GET",
        })

        setComments(res.data.data.comments);
        console.log(res.data.data.comments);
    }
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [commentsData, setComments] = useState([]);

    const [text, setText] = useState("");

    const handleCommentsModalOpen = () => {
        loadComments().then(() => {

            setCommentsModalOpen(true);
        });



    }
    const handleCommentsModalClose = () => {
        setCommentsModalOpen(false);
    }

    const postComment = async (e) => {
        console.log(commentInput);
        if (commentInput != "") {
            const res = await axios("../api/podcast/comments/" + id, {
                method: "PUT",
                data: {
                    userID: user._id,
                    comment: commentInput,
                    timestamp: new Date()
                }
            })
            setCommentInput("");
            console.log(res.data);

        }


    }

    return (
        <div className=" bg-[#1f1e1e] text-white my-7 border-2 rounded-md p-3  m-10 md:m-3">
            <div className="flex flex-col items-center p-5 md:flex-row w-full">
                <img src={img} className=" h-[180px] w-[180px] object-cover border  mr-3" alt="" />
                <div className="w-full">
                    <div className=" flex justify-between items-center p-5">
                        <div className="flex items-center cursor-pointer" onClick={() => {
                            router.push('/creator/' + creatorID)
                        }}>
                            <Tooltip className=" capitalize" title={name}>
                                <Avatar
                                    alt=""

                                    className={`h-10 w-10  uppercase  m-2`}
                                    style={{ backgroundColor: `${creatorColor}` }}
                                >{name[0]}</Avatar>

                            </Tooltip>
                            <p className="flex-1 font-bold ">{username}</p>
                        </div>
                        <div>
                            {summlink != null ? (
                                <Tooltip title="Play Summary">
                                    <PlayArrow className="w-9 h-9 cursor-pointer text-green-500" onClick={() => {

                                        dispatch({
                                            type: actionTypes.SET_URL,
                                            podcast: { id: id, title: title, creators: creators, url: summlink, img: img }
                                        })
                                    }} />
                                </Tooltip>
                            ) : null}

                            <Tooltip title="Play Podcast">
                                < PlayCircleFilled className="w-9 h-9 cursor-pointer text-green-500" onClick={playPodcast} />
                            </Tooltip>
                        </div>
                    </div>




                    <div className="ml-5 h-[120px] flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
                        <p className="font-bold capitalize">{title}</p>
                        <p className="font-bold capitalize text-[#646363] mb-2">{categories}</p>

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
                        <Comment className="btn" onClick={handleCommentsModalOpen} />
                        {/* <Send className="btn -rotate-90" /> */}


                    </div>
                    <button onClick={handleSave} disabled={saveIsDisabled}>
                        {isSaved ? (<Bookmark className="btn" />) : (<BookmarkBorderOutlined className="btn" />)}

                    </button>
                </div>
                <div className="mx-5 mt-1 font-bold cursor-pointer">
                    {views?.length} Views and {likes?.length} Likes
                </div>
                <div className="mx-5 mt-1 break-word overflow-hidden overflow-ellipsis ">
                    {/* <span className="font-bold mr-1">{username}</span> */}
                    {/* <p>{summary}</p> */}
                </div>

                <div className="flex items-center p-4 ">
                    {/* <InputEmoji className="h-7" /> */}
                    {/* <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                        /> */}
                    <InputEmoji type="text"
                        placeholder="Add a comment..."
                        value={commentInput}
                        cleanOnEnter
                        onChange={setCommentInput}
                        onEnter={postComment}
                        theme="dark"
                        borderColor="#ff0000"
                        className="border-none rounded-full  bg-auto mx-2 flex-1 focus:ring-0 outline-none items-center text-black" />
                    {/* <button type="submit" onClick={postComment} className="font-semibold text-blue-600">Post</button> */}
                </div>
            </>) : null}


            {/* TODO: Comments */}
            <Modal
                open={commentsModalOpen}
                onClose={handleCommentsModalClose}
            >
                <div style={modalStyle} className={`${classes.paper} border-0 p-1 h-[200px] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400`}>
                    <div className="">
                        {commentsData?.map((comment) => (
                            <p className="px-4 mt-4 ">
                                <div className="flex">
                                    <div className="m-1 capitalize"><Avatar style={{ backgroundColor: comment.userID.color }}>{comment.userID.name[0]}</Avatar></div>
                                    <div className="w-full">
                                        <div className="flex justify-between">
                                            <span className="font-semibold mr-3 text-sm">{comment.userID.name}</span>
                                            <p className="text-sm text-[gray]">{new Date(comment.timestamp).toDateString() + " at " + new Date(comment.timestamp).toTimeString().split("G")[0]}</p>

                                        </div>
                                        <p>{comment.comment}</p>

                                    </div>


                                </div>
                            </p>
                        ))}
                    </div>
                    {/* <hr /> */}

                    {/* <div className="flex items-center ">                        
                        <InputEmoji type="text"
                            placeholder="Add a comment..."
                            value={commentInput}
                            cleanOnEnter
                            onChange={setCommentInput}
                            onEnter={postComment}
                            className="border-none rounded-full  bg-auto mx-2 flex-1 focus:ring-0 outline-none items-center text-black" />
                    </div> */}
                </div>


            </Modal>





        </div>
    )
}

export default Post


