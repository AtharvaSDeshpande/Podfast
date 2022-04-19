import { Avatar } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Creator from '../../components/Creator';
import { isSignedIn, loginUser } from '../../components/functions';
import Header from '../../components/Header';
import Player from '../../components/Player';
import Welcome from '../../components/Welcome';
import { useStateValue } from '../../redux/StateProvider';

function CreatorPage() {
    const router = useRouter();
    console.log(router.query.id)
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
  
        <main className="flex-1 text-white w-full  bg-gradient-to-b from-[#160129] to-[#131316] overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
        <div className = "flex items-center justify-between  p-3  border-b-[1px] border-white ">
               {/* <img className = "rounded-full border p-[2px] w-12 h-12" src = "https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c" alt=""/> */}
                <Avatar style = {{backgroundColor: `${color}`}} className='capitalize'>{name[0]}</Avatar>
                <div className="flex-1 mx-4">
                    <h2 className = "font-bold text-white ">{email.split('@')[0]}</h2>
                    <h3 className = "text-sm  text-white overflow-clip capitalize" >{name} </h3>
                </div>
                {/* <button  className="font-semibold text-sm text-white p-1 bg-red-600 rounded-full"  >Unsubscribe</button>  */}
            </div>
        </main>
  
        <footer className="items-center   w-full  border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
          <Player />
        </footer>
      </div>
    )
}

export default CreatorPage