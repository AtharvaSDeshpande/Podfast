
import Head from 'next/head'
import { useEffect } from 'react'
import Saved from '../components/Saved'
import { isSignedIn, loginUser } from '../components/functions'
import Header from '../components/Header'
import Player from '../components/Player'
import { useStateValue } from '../redux/StateProvider'
import { useRouter } from "next/router";
import Welcome from '../components/Welcome'
import { getCookie } from 'cookies-next'
import { actionTypes } from '../redux/reducer'

export default function Explore() {
  const [{ user }, dispatch] = useStateValue();
  if (user == null)
  {
    loginUser();
  }
  
  if (!isSignedIn(user))
    return (<Welcome />)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex-1  w-full  bg-gradient-to-b from-[#160129] to-[#02108b] overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
        <Saved />
      </main>

      <footer className="items-center   w-full  p-3 border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
        <Player />
      </footer>
    </div>
  )
}

console.log("6IoJbs4HD0uj7JiE")

