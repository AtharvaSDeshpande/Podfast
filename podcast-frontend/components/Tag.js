// import { Clear } from '@material-ui/icons'
import React from 'react'


function Tag({name}) {
    return (
        <div className = "bg-inherit  flex items-center  w-fit m-1 ">
            <div className = "font-bold ml-1 mr-1 w-fit text-[#0268ed]">
                {name}
            </div>
            
            {/* <Clear className = "text-sm cursor-pointer"/> */}
            
        </div>
    )
}

export default Tag