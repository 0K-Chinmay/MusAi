'use client'
import React from 'react';
import Nav from '../../components/nav'
import Card from '../../components/card'
import { useEffect, useState } from 'react';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { RxCross2 } from "react-icons/rx";
import Link from 'next/link'
import {useUser, SignedIn} from '@clerk/nextjs'
import { FaPlus } from "react-icons/fa6";
export default function Home() {
  const [op, setop] = useState(false)
  const [pl, setpl] = useState(false)
  const [links, setlinks] = useState(0)
  const [info, setinfo] = useState([])
  const {user,isLoaded} = useUser();
   const fetchMyAPI=async()=>{
    const secret=`${user?.id}${user?.primaryEmailAddressId }`
    const response=await fetch('https://mus-ai-git-main-0kchinmays-projects.vercel.app/api/playlist', {
    method:'POST',
     headers:{
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
     secret:secret
  }), 
})
setinfo(await response.json())
}
  useEffect(() => {
    if(isLoaded)
        fetchMyAPI();
  }, [isLoaded,op])

  const del=async(n)=>{
    let k=n.prompt
    const response=await fetch('https://mus-ai-git-main-0kchinmays-projects.vercel.app/api/del', {
    method:'POST',
     headers:{
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
     key:k
  }), 
})
const gone=await response.json()
  if(gone.acknowledged){

    await user.update({
      unsafeMetadata: {
        limit:user?.unsafeMetadata?.limit-1
      }
    })
  }
  setop(!op)
  }
  return (
    <div>
      <SignedIn>
    <Nav/>
    
    <div className='absolute h-full w-[100%] z-0 bottom-0 flex
     flex-wrap justify-center items-center' >
      <RxCross2 className={pl?' fixed z-30 cursor-pointer top-[6rem] right-2':'hidden'} size={40} onClick={()=>{setpl(false)}} />
      <div className=' h-[80%] w-[88%]  flex items-center justify-center gap-[5rem] flex-wrap'>
      {info.map((n,i)=>
      <div className='m-0 cursor-pointer'onClick={()=>{setpl(true);setlinks(i)}}>
      <RxCross2 className='absolute z-10  ' size={30} onClick={(e)=>{
        e.stopPropagation()
        del(n)
      }}/>
      <Card key={i} iname={n}/>
      </div>
      )}
         <div className=' flex h-[20rem] w-[22rem] max-w-[22rem]  items-center justify-center'>
        <Link href='/Create'>
        <FaPlus size={60} className=' cursor-pointer'/>
        </Link>
        </div>
      </div>
      {pl?
      <div className='fixed bg-black h-screen w-screen flex items-center justify-center bg-opacity-[0.6] z-20 top-[3rem]'>
      <Player  includeTags={false} includeSearch={false} trackList={info[links]?.songInfo}/>
      </div>
      :<></>}
    </div>
        </SignedIn>
    </div>
  );
}
