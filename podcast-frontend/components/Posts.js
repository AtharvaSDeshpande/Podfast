import { useEffect, useState } from "react"
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/StateProvider";
import Post from "./Post"
const axios = require('axios').default;




function Posts() {
    // const [posts,setPosts] = useState();
    const [{ user, podcasts, skip }, dispatch] = useStateValue();
    let fetchedPodcasts = podcasts;
    const getData = async () => {
        // alert("GD")
        try {

            const res = await axios('../api/podcast/podcasts/' + skip, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },



            })
            const podcasts = res.data.data;
            podcasts.map(podcast => {
                fetchedPodcasts.push(podcast)
            })
            console.log(podcasts)
            // if (fetchedPodcasts.length != 0) {
                // alert("if")
                // setFetchedPodcasts(oldArray => [...oldArray, podcasts]);

                console.log(fetchedPodcasts)
                dispatch({
                    type: actionTypes.SET_PODCASTS,
                    podcasts: fetchedPodcasts
                })
            // }
            // else{
            //     alert("else")
            //     setFetchedPodcasts(podcasts)
            //     console.log(fetchedPodcasts)
            //     dispatch({
            //         type: actionTypes.SET_PODCASTS,
            //         podcasts: podcasts
            //     })
            // }
            // console.log(posts)


        } catch (error) {


            console.log(error)
        }

    }
    useEffect(() => {
        // alert("Update Skip")
        getData();
    }, [skip])

    // const l ="gujigbiuo" // "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ut vero aspernatur cumque ipsa quam culpa ipsum sunt magni beatae totam sint cum labore ea, quis pariatur? Eum, porro harum?"

    return (
        <div>
            {podcasts?.map((podcast) => (
                <Post id={podcast._id} img={podcast.img} username={podcast.creatorID.email.split("@")[0]} name={podcast.creatorID.name} creatorColor = {podcast.creatorID.color} caption={podcast?.description} link={podcast.url} summlink={podcast.summaryUrl} title={podcast.title} creators={podcast.creatorNames.join(", ")} likes={podcast.likes} views={podcast.views} categories = {podcast?.categories}/>
            ))}

        </div>
    )
}

export default Posts


/*
{posts?.map((post) => (
                <Post id={post.id} img={post.img} username={post.username} userImg={post.userImg} caption={post.caption} link={post.url} summlink={post.summurl} />
            ))}
*/
// Post
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ut vero aspernatur cumque ipsa quam culpa ipsum sunt magni beatae totam sint cum labore ea, quis pariatur? Eum, porro harum?
// Aut vero eos, ut asperiores et quaerat error officiis iusto repellat, aliquid recusandae ex fuga commodi harum quisquam quam minima est nemo architecto impedit distinctio veritatis, nobis quia atque. Voluptatibus!
// Eum necessitatibus aperiam quo. Voluptatum quasi hic eligendi quos cum nostrum, nihil harum accusamus ex ipsam sapiente, sit blanditiis deleniti beatae officiis rerum est labore assumenda tempora iure impedit quaerat.
// Quae excepturi ipsa fugiat dignissimos temporibus soluta minus nesciunt quam illum. Omnis illum est dolor repellat asperiores amet nobis nam esse ut animi, veritatis sed cupiditate? Earum voluptas quas magni?
// Maiores, quidem sequi consequatur, quasi accusantium, officia laudantium id consequuntur atque nostrum rerum quod eius deserunt a? Nostrum laboriosam quis sit magnam? Quasi dolor omnis fuga cum in vitae commodi.
// Quod eligendi odio ipsam incidunt nobis, ratione eaque veritatis amet iste aliquam aut voluptatum facere qui ad voluptas magni non culpa minus vero omnis accusantium alias obcaecati libero assumenda. Magni?
// Voluptas, maiores vel unde soluta quas repellat voluptatum natus eos quos fugiat aut accusantium quo, est excepturi provident labore! Commodi esse inventore perspiciatis beatae ducimus ullam ut nam, incidunt explicabo.
// Recusandae tempora aliquam quos minima incidunt, nulla corrupti odio, pariatur reprehenderit asperiores totam delectus. Iure, ex ab illum cum quod eos illo, incidunt voluptatem fugit molestiae consequatur, dolorem sit fugiat.
// Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.
// Sit tenetur obcaecati eveniet accusamus similique alias optio error at? Ducimus ullam, ipsa recusandae porro eum pariatur? Libero est repellendus sapiente labore error soluta praesentium omnis! Nesciunt rem explicabo temporibus!