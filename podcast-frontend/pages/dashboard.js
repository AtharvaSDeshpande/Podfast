import Head from 'next/head'
import Header from '../components/Dashboard/Header';
import Main from '../components/Dashboard/Main';
import { isCreator, isSignedIn, loginUser } from '../components/functions';

import Welcome from '../components/Welcome';
import { useStateValue } from '../redux/StateProvider'


const Dashboard =  () => {

    const [{ user,dashboardpage }, dispatch] = useStateValue();
    // alert(dashboardpage)
    if (user == null) {
        loginUser();
    }

    if (!isSignedIn(user))
        return <Welcome/>
    else if (!isCreator(user))
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

        <div className="min-h-screen bg-gradient-to-r from-[#160129] to-[#131316] h-full">
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main/>
            
        </div>
    )
}
export default Dashboard ;


{/* <ul >
                            <li className="mr-6 my-2 md:my-0">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-blue-400 no-underline hover:text-gray-100 border-b-2 border-blue-400 hover:border-blue-400">
                                    <Home className="fas fa-home fa-fw mr-3 text-blue-400" /><span className="pb-1 md:pb-0 text-sm">Home</span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-pink-400">
                                    <TodayOutlined className="fas fa-tasks fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Tasks</span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-purple-400">
                                    <Message className="fa fa-envelope fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Messages</span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-green-400">
                                    <GraphicEq className="fas fa-chart-area fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Analytics</span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-red-400">
                                    <Payment className="fa fa-wallet fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Payments</span>
                                </a>
                            </li>
                        </ul> */}