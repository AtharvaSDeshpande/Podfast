import Head from 'next/head'
import Signup from '../components/Signup'





export default function Create() {
  



    return (
      <div className="items-center justify-center min-h-full  bg-gradient-to-r from-[#160129] to-[#02108b] h-screen pt-3 overflow-y-scroll ">
        <Head>
          <title>Create Account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="w-full mt-15">
          <div className='grid place-content-center min-h-full my-5'>
            <Signup className="w-[400px] mt-10"/>
          </div>
          
        </main>
  
       
      </div>
    )
  }
