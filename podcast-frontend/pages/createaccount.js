import Head from 'next/head'
import Signup from '../components/Signup'





export default function Create() {
  



    return (
      <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll ">
        <Head>
          <title>Create Account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="w-full bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-black ">
          <div className='grid place-content-center min-h-full my-5'>
            <Signup className="w-[400px]"/>
          </div>
          
        </main>
  
       
      </div>
    )
  }
