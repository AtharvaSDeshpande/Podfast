import { Avatar, Tabs, Tab } from '@material-ui/core';
import { ArrowBack, Audiotrack, Home, Person, Publish, TrendingUp } from '@material-ui/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { actionTypes } from '../../redux/reducer';
import { useStateValue } from '../../redux/StateProvider';

function Header() {
    const [{ user }, dispatch] = useStateValue();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        dispatch({
            type: actionTypes.SET_DASHBOARDPAGE,
            dashboardpage: newValue
        })
        dispatch({
            type: actionTypes.SET_URL,
            podcast: {title: "",creators: "", url: null},
        })
        setValue(newValue);
    };
    useEffect(()=>{
        dispatch({
            type: actionTypes.SET_DASHBOARDPAGE,
            dashboardpage: 0
        })
    },[])
    return (
        <nav id="header" className="bg-gray-900  w-full   shadow">
            <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
                <div className="w-1/2 pl-2 md:pl-0">
                    <Link href="/" >

                        <a className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold  flex ml-3 align-center" href="#">
                            <div className='flex items-center'>
                                <ArrowBack className="text-blue-400 " />
                                <p>Back to Podfast Home</p>
                            </div>
                        </a>

                    </Link>
                </div>
                <div className="w-1/2 pr-0">
                    <div className="flex relative float-right">
                        <div className="relative text-sm text-gray-100 mr-5">
                            <Avatar>{user?.name[0]}</Avatar>

                        </div>

                    </div>
                </div>
                <div className="w-full items-center flex flex-wrap justify-evenly bg-gray-900 text-white" id="nav-content">
                    {/* <Paper square className={classes.root}> */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon label tabs example"

                    >
                        <Tab icon={<Home />} label="HOME" className='text-white' />
                        <Tab icon={<Audiotrack />} className='text-white' label="PODCASTS" />
                        <Tab icon={<Publish />} className='text-white' label="UPLOAD" />

                        <Tab icon={<Person />} className='text-white' label="PROFILE" />
                        <Tab icon={<TrendingUp />} className='text-white' label="GROWTH" />

                    </Tabs>
                    {/* </Paper> */}
                </div>
            </div>
        </nav>



    )
}

export default Header