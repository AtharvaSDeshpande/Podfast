import Head from 'next/head'
import { isCreator, isSignedIn, loginUser } from '../components/functions';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import { useStateValue } from '../redux/StateProvider'



export default function Dashboard() {
    const [{ user }, dispatch] = useStateValue();
    if (user == null)
    {
      loginUser();
    }
    if (!isSignedIn(user))
        return (<Welcome />)
    if (!isCreator(user))
        return (
            <>
                <Head>
                    <title>PodFast</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>
                    You do not have access to the creator dashboard, switch to creator mode through your profile to get access to this page.
                </div>
            </>
        )
    return (

        <div className="">
            <Head>
                <title>Create Account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <main className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll ">
                <div className='text-white'>
                  Welcome to Creator Dashboard
                </div>

            </main>


        </div>
    )
}