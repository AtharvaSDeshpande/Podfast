
import Head from 'next/head'
import { useEffect } from 'react'
import Search from '../components/Search'
import { isSignedIn, loginUser } from '../components/functions'
import Header from '../components/Header'
import Player from '../components/Player'
import { useStateValue } from '../redux/StateProvider'
import { useRouter } from "next/router";
import Welcome from '../components/Welcome'
import { getCookie } from 'cookies-next'
import reducer, { actionTypes,initialState } from '../redux/reducer'
import { Button } from '@material-ui/core'
import axios from 'axios';


export default function Explore({posts1}) {
  const [{ user }, dispatch] = useStateValue();
  const handleSubmit = async(e) => {
    let url = 'http://localhost:8000/'+user?._id;
    const res = await axios.get(url, "Shruti", {
      headers: {
        'content-type': 'text/plain'
      }
    })
    console.log(res)
        // .then(res => {
        //   //console.log(res.data);
        // })
        // .catch(err => console.log(err))
  };
  
  if (user == null)
  {
    loginUser();
  }
  //const u1 = decodeURIComponent(getCookie("user")._id)
  //console.log(u1)
  // if (getCookie("user")) {
  //   const u = JSON.parse(getCookie("user"))
  //   // console.log(u);
  //   dispatch({
  //     type: actionTypes.SET_USER,
  //     user: u
  //   })
  //  // console.log(u._id)
  // }

  if (!isSignedIn(user))
    return (<Welcome />)
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Button className = "bg-gradient-to-b from-[#160129] to-gray-900 text-white" onClick = {handleSubmit}></Button>
      
      <main className="flex-1  w-full  bg-gradient-to-b from-[#160129] to-[#131316] overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
        <Search recommendedPodcast = {posts1}/>
      </main>

      <footer className="items-center   w-full   border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
        <Player />
      </footer>

    </div>
  )
}

console.log("6IoJbs4HD0uj7JiE")

export async function getStaticProps(){
    const res = await fetch('http://127.0.0.1:8000/podcastrecommender/api/', {
      headers: {
        'Content-Type': 'application/json',
        'name' : 'Shruti',
      },
     // body: JSON.stringify("shruti"),
    })
    const posts1 = await res.json();
    return{
      props:{
        posts1
      }
    };
  }


// export async function getStaticProps(){
//   const res = await fetch("http://127.0.0.1:8000/podcastrecommender/api/");
//   const posts1 = await res.json();
//   console.log(posts1);
//   return{
//     props:{
//       posts1
//     }
//   };
// }


