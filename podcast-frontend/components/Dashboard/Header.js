import { Avatar, Tabs, Tab } from '@material-ui/core';
import { ArrowBack, Audiotrack, Home, Person, Publish, TrendingUp } from '@material-ui/icons';
import Link from 'next/link';
import React, { useState } from 'react'
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
        setValue(newValue);
    };
    return (
        <nav id="header" className="bg-gray-900  w-full   shadow">
            <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
                <div className="w-1/2 pl-2 md:pl-0">
                    <Link href="/">

                        <a className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold align-middle" href="#">
                            <div className='flex align-baseline'>
                                <ArrowBack className="fas fa-moon text-blue-400 mr-1" />

                                Back to Podfast Home
                            </div>
                        </a>

                    </Link>
                </div>
                <div className="w-1/2 pr-0">
                    <div className="flex relative float-right">
                        <div className="relative text-sm text-gray-100">
                            <Avatar>{user?.name[0]}</Avatar>

                        </div>

                    </div>
                </div>
                <div className="w-full flex-grow  lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-900 z-20 text-white" id="nav-content">
                    {/* <Paper square className={classes.root}> */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
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