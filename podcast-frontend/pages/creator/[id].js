import { Avatar } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Creator from '../../components/Creator';
import CreatorProfile from '../../components/CreatorProfile';
import { isSignedIn, loginUser } from '../../components/functions';
import Header from '../../components/Header';
import Player from '../../components/Player';
import Welcome from '../../components/Welcome';
import { useStateValue } from '../../redux/StateProvider';

function CreatorPage() {
    const router = useRouter();
    const id = router.query.id
    console.log(id)
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
  
        <main className="flex-1 text-white w-full  bg-gradient-to-b from-[#160129] to-[#131316] overflow-y-scroll scrollbar-thin scrollbar-thumb-white">
            <CreatorProfile id = {id}/>
        </main>
  
        <footer className="items-center   w-full  border-neutral-900 border-b  bg-gradient-to-b from-[#160129] to-gray-900 text-white">
          <Player />
        </footer>
      </div>
    )
}

export default CreatorPage