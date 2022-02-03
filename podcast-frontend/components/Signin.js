import { Button } from '@material-ui/core';
import React from 'react';
import Link from 'next/link'
function Signin() {
    return <div className='border h-auto m-3 bg-gradient-to-b from-black to-gray-900 flex flex-col'>
        <Link href={"/"}>
            <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-23-10%20Wix%20Logo%20Maker.png?alt=media&token=7e38466a-34e7-4a00-b67f-3c207ba09613"
                className='object-contain m-3'
            />
        </Link>
        <div className = 'm-3' >
            <h1 className='text-white text-4xl  mb-0 font-bold text-center'>Login</h1>
            <p className='text-white mt-0 text-center mb-3'>Or <Link  href="/createaccount"><a className="text-red-800">Create Account</a></Link></p>
        </div>
        <form className='flex flex-col p-4'>
            
            <label className='ml-2 text-white'>Email:</label>
            <input className='m-2' type="email" placeholder='Enter your Email'/>
            <label className='ml-2 text-white'>Password:</label>
            <input className='m-2' type = "password" placeholder='Enter your Password'/>
            <Button className='m-2 mt-5' variant='contained' color='secondary'>Login</Button>
        </form>

    </div>;
}

export default Signin;
