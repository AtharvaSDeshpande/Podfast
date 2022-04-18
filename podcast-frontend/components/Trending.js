import axios from 'axios'
import React from 'react'


function Trending() {
  const getTrends = async() => {
    const res = await axios('../api/trends/getTrending', {
      method: "GET",

  })
    console.log(res.data)
  }
  return (
    <div className='text-white'>
      {/* Trending */}
      <button  onClick = {getTrends}>Get Trends</button>  
    </div>
  )
}

export default Trending