import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
function Welcome() {
  return <div className = "text-white flex-1 grid place-content-center items-center  w-full  bg-black overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
      <p className='text-white text-4xl text-center font-bold mb-1'>Welcome to PodFast</p>
      <p className='text-white text-1xl text-center mb-1'>Login to get started...</p>
      <Link href = "/login">
            <Button variant='contained' color = 'secondary'>Login</Button>
  
      </Link>
      </div>;
}

export default Welcome;
