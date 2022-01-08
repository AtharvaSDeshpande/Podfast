import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Player from '../components/Player'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>PodFast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      
      <main className="flex-1  w-full  bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
        <Feed/>
      </main>

      <footer className="items-center   w-full  p-3 border-neutral-900 border-b  bg-gradient-to-b from-black to-gray-900 text-white">
        <Player/>
      </footer>
    </div>
  )
}
