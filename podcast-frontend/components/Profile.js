import { Button } from '@material-ui/core';
import axios from 'axios';
import { removeCookies, setCookies } from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { actionTypes } from '../redux/reducer';
import { useStateValue } from '../redux/StateProvider';
function Profile() {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const signOut = () => {
    dispatch({
        type: actionTypes.SET_USER,
        user: null
    })
    removeCookies("user")

}
  const updatePrivilige = async(val) => {
    try {
      const res = await axios('../api/user/upgrade', {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          data: {id: user._id , isCreator: val}

      })
        // removeCookies("user")
        setCookies("user",res.data.user,{maxAge: 3600000,sameSite: true});
        dispatch({
            type: actionTypes.SET_USER,
            user: res.data.user
        })
        router.push("/");
      
      
           
       

  } catch (error) {
      console.log("An unexpected error has occured");
  }

  }
  console.log(user);
  return <div className="leading-normal tracking-normal text-white gradient height-full bg-gradient-to-r from-[#160129] to-[#131316]">


    <div className="h-screen">

      <div className="container  w-full  flex  flex-col md:flex-row  justify-center">
        {/*Left Col*/}
        <div className="flex flex-col mt-2   flex-1 w-full  justify-center text-left">
          <div className="flex flex-col  mt-2 w-full px-5 mx-auto">
            <label className="">Name</label>
            <input type="text" className="w-full capitalize text-black cursor-not-allowed" value={user.name} />
          </div>
          <div className="flex flex-col mt-2 w-full px-5">
            <label className="">Email</label>
            <input type="email" className="w-full text-black cursor-not-allowed" value={user.email} disabled />
          </div>
          <div className="flex flex-col mt-2 w-full px-5">
            <label className="">Password</label>
            <input type="password" className="w-full text-black" placeholder = "Enter New Password" />
          </div>
          <div className="flex flex-col mt-2 w-full px-5">
            <label className="">Confirm Password</label>
            <input type="password" className="w-full text-black" placeholder = "Confirm Password" />
          </div>


          <div className="flex flex-col px-10 mt-5 w-full">
            
          <Button type="submit" variant="contained" color="primary" className="m-1 w-full"  >
              Change Password
          </Button>{!user.isCreator?
          <Button type="submit" variant="contained" color="primary" className="m-1 w-full" onClick={()=>{updatePrivilige(true)}} >
              Upgrade to Creator
          </Button>:<Button type="submit" variant="contained" color="primary" className="m-1 w-full" onClick={()=>{updatePrivilige(false)}} >
              Downgrade to user
          </Button>}
          <Button type="submit" variant="contained" color="primary" className="m-1 w-full" onClick = {signOut} >
              Signout
          </Button>
          </div>

        </div>
        {/*Right Col*/}
        <div className="w-full flex-1 md:flex   my-10 text-center">
          <img className="w-full md:w-full my-5  object-contain h-[300px]  z-50" src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/000-Podcast-Cover-Art-Featured-removebg-preview.png?alt=media&token=8b32ef23-beae-48ad-8127-0716cf7c187c" />
        </div>
      </div>
    </div>

  </div>;
}

export default Profile;

/*
      
     

*/