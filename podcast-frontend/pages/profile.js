
import Head from 'next/head'
import { useEffect } from 'react'
import { isSignedIn, loginUser } from '../components/functions'
import Header from '../components/Header'
import { useStateValue } from '../redux/StateProvider'
import { useRouter } from "next/router";
import Welcome from '../components/Welcome'
import { getCookie } from 'cookies-next'
import { actionTypes } from '../redux/reducer'
import Profile from '../components/Profile'

export default function ProfilePage() {
    const [{ user }, dispatch] = useStateValue();
    if (user == null) {
        loginUser();
    }

    if (!isSignedIn(user))
        return (<Welcome />)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-900 h-screen overflow-y-scroll scrollbar-hide">
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main className="flex-1  w-full  bg-gradient-to-b from-[#160129] to-[#131316] overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                <Profile />
            </main>

        </div>
    )
}

console.log("6IoJbs4HD0uj7JiE")

