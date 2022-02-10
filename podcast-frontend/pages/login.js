import Head from 'next/head'
import Signin from '../components/Signin'

export default function Login() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide">
        <Head>
          <title>Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="flex-1 grid place-content-center items-center  w-full  bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          <Signin/>
        </main>
  
       
      </div>
    )
  }
