import { Avatar } from '@material-ui/core'
import React from 'react'

function Creator({id,email,name,color}) {
  return (
    <div className = "flex items-center justify-between  p-3  border-b-[1px] border-white ">
               {/* <img className = "rounded-full border p-[2px] w-12 h-12" src = "https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c" alt=""/> */}
                <Avatar style = {{backgroundColor: `${color}`}} className='capitalize'>{name[0]}</Avatar>
                <div className="flex-1 mx-4">
                    <h2 className = "font-bold text-white ">{email.split('@')[0]}</h2>
                    <h3 className = "text-sm  text-white overflow-clip capitalize" >{name} </h3>
                </div>
                {/* <button  className="font-semibold text-sm text-white p-1 bg-red-600 rounded-full"  >Unsubscribe</button>  */}
            </div>
            
  )
}

export default Creator