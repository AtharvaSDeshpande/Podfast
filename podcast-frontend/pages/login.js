import Head from 'next/head'
import { Router, useRouter } from 'next/router';
import { isSignedIn, loginUser } from '../components/functions'
import Signin from '../components/Signin'
import { useStateValue } from '../redux/StateProvider';

export default function Login() {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();
  if (user == null)
  {
    loginUser();
  }
  
  if (isSignedIn(user))
  {
    router.push("/");
  }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-[#160129] to-[#131316] h-screen overflow-y-scroll scrollbar-hide">
        <Head>
          <title>Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="flex-1 grid place-content-center items-center  w-full   overflow-y-scroll scrollbar-thin scrollbar-thumb-white">
          <Signin/>
        </main>
  
       
      </div>
    )
  }
