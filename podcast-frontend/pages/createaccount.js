import Head from 'next/head'
import Signup from '../components/Signup'

export default function Create() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide ">
        <Head>
          <title>Create Account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="flex-1 grid place-content-center items-center  w-full  bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-black p-5">
          <Signup/>
        </main>
  
       
      </div>
    )
  }
