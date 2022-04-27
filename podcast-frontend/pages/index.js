
import Head from 'next/head'
import React from 'react'
import Feed from '../components/Feed'
import { isSignedIn, loginUser, setSkip } from '../components/functions'
import Header from '../components/Header'
import Player from '../components/Player'
import { useStateValue } from '../redux/StateProvider'
import Welcome from '../components/Welcome'
import { actionTypes } from '../redux/reducer'

export default function Home() {  
  
  const [{ user, podcasts }, dispatch] = useStateValue();

  
  if (user == null) {
    loginUser();
  }

  if (!isSignedIn(user)) {
    return (<Welcome />)
  }

  
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target
    if (offsetHeight + scrollTop >= scrollHeight-5) {
      // alert("ss")
      
        dispatch({
          type: actionTypes.SET_SKIP,
          skip: podcasts.length
        })
      
    }
  }

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen   h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>PodFast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main onScroll={handleScroll} className="flex-1  w-full  bg-gradient-to-b from-[#160129] to-[#131316] overflow-y-scroll scrollbar-thin scrollbar-thumb-white">
        <Feed />
      </main>

      <footer className="items-center   w-full   border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
        <Player />
      </footer>
    </div>
  )
}

// console.log("6IoJbs4HD0uj7JiE")

