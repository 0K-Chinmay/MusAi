'use client'
import React from 'react';
import Nav from '../../components/nav'
import Card from '../../components/card'
import { useEffect, useState } from 'react';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { RxCross2 } from "react-icons/rx";

export default function Home() {
  const [pl, setpl] = useState(false)
  const [links, setlinks] = useState(0)
  const [info, setinfo] = useState([])
   const fetchMyAPI=async()=>{
    const response=await fetch('https://mus-ai-git-main-0kchinmays-projects.vercel.app/api/explore', {
    method:'POST',
     headers:{
    'Content-Type': 'application/json'
  },
})

setinfo(await response.json())
}
  useEffect(() => {
        fetchMyAPI();
  },[])
  return (
    <div>
    <Nav/>
    <div className='absolute h-full w-[100%] z-0 bottom-0 flex
     flex-wrap justify-center items-center' >
      <RxCross2 className={pl?' absolute z-10 cursor-pointer top-14 right-8':'hidden'} size={40} onClick={()=>{setpl(false)}} />
      <div className=' h-[80%] w-[88%]  flex items-center justify-center gap-[5rem] flex-wrap'>
      {info.map((n,i)=>
      <div className='m-0 cursor-pointer'onClick={()=>{setpl(true);setlinks(i)}}>
      <Card key={i} iname={n}/>
      </div>
      )}
      </div>
      {pl?
      <div className='absolute bg-black h-screen w-screen flex items-center justify-center bg-opacity-[0.6]'>
      <Player  includeTags={false} includeSearch={false} trackList={info[links]?.songInfo}/>
      </div>
      :<></>}
    </div>
    </div>
  );
}
