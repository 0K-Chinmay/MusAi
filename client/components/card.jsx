import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
function card({iname}) {
  
  function getImg(){

  }

  return (
    <div className="relative h-[20rem] max-w-[22rem] " >
    <img className="h-[20rem] w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1680725779155-456faadefa26" alt="Random image"/>
    <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
    <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold">{iname.prompt}</h2>
    </div>
</div>
  )
}

export default card