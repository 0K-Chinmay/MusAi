"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import {
  SignUp,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

function Nav() {
    const [nav, setnav] = useState(false)
    const [bgcolor, setbgcolor] = useState('transparent');
    const [textcolor, settextcolor] = useState('white');
    const handlenav=()=>{
        setnav(!nav);
    };

    useEffect(() => {
      const scrl=()=>{
        if(window.scrollY>100){
          setbgcolor('white');
          settextcolor('black');
        }
        else{
          setbgcolor('transparent');
          settextcolor('white');
        }
      }
    window.addEventListener('scroll',scrl)  
    },[])
    
  return (
<div style={{backgroundColor:`${bgcolor}`}} className='fixed 1left-0 top-0 w-full z-10 ease-in duration-200'>
    <div style={{color:`${textcolor}`}} className=' max-w-[1370px] flex p-4 justify-between items-center m-auto '>
        <Link href='/' className=' text-4xl font-bold'>MusAI</Link>
        <ul className='hidden sm:flex gap-4'>
            <li>
            <Link className='p-4' href='/'>Home</Link>
            </li>
            <li>
            <Link className='p-4' href='/Create'>Create</Link>
            </li>
            <li>
            
              <SignedIn><Link className='p-4' href='/Playlists'>Playlists </Link></SignedIn>
              <SignedOut><Link className='p-4' href='/Explore'>Explore</Link></SignedOut>
              
            </li>
            <li>
            <Link className='p-4' href='/contact'>Contact</Link>
            </li>
            <li>
            <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonPopoverCard:'bg-black-100'
              }
            }}/>
            </SignedIn>
            </li>
        </ul>
        <div onClick={handlenav} style={{color:`${textcolor}`}}  className='block sm:hidden z-10 ease-in duration-200'>
     {/*//mobile button */}
       {nav?<AiOutlineClose size={25}/>:<AiOutlineMenu size={25}/>} 
    </div>
    <div className={nav?
    'sm:hidden absolute text-white text-center bg-black flex top-0 left-0 right-0 bottom-0 justify-center items-center h-screen w-full ease-in duration-300'
    : 'sm:hidden absolute text-center bg-black flex top-0 left-[-100%] right-0 bottom-0 justify-center items-center h-screen w-full ease-in duration-300'}>
    <ul>
        <li className='text-4xl p-4 hover:text-gray-400'>
        <Link href='/'>Home</Link>
        </li>
        <li className='text-4xl p-4 hover:text-gray-400'>
        <Link href='/Create'>Create</Link>
        </li>
        <li className='text-4xl p-4 hover:text-gray-400'>

        <SignedIn><Link className='p-4' href='/Playlists'>Playlists </Link></SignedIn>
        <SignedOut><Link className='p-4' href='/Explore'>Explore</Link></SignedOut>
        
        </li>
        <li className='text-4xl p-4 hover:text-gray-400'>
        <Link href='/contact'>Contact</Link>
        </li>
        <li className='text-4xl p-4 hover:text-gray-400'>
        <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox:'w-[50px] h-[50px]'
              }
            }}/>
            </SignedIn>
        </li>
        </ul>
        </div>  
    </div>
</div>
  )
}

export default Nav