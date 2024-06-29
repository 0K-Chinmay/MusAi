"use client"
import { useEffect, useState } from 'react';
import Nav from '../../components/nav'
import Groq from 'groq-sdk'
import { FaSearch } from "react-icons/fa";
import React from 'react';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import ReactLoading from "react-loading";
import {useUser, SignedIn} from '@clerk/nextjs'
import Popup from'../../components/popup'
import { setTimeout } from 'timers';
var art=[{}];
let urls;
export default function Home() {
    const {user} = useUser();
    const [repeat, setrepeat] = useState(false)
    const [loadin, setloadin] = useState(false)
    const [search, setsearch] = useState(false)
    const [saved, setsaved] = useState(false)
    const [prompt, setprompt] = useState('')
    const [songs, setsongs] = useState([''])  
    const [limit, setlimit] = useState(user?.unsafeMetadata?.limit ?? 0)  

useEffect(() => {

     user?.update({
        unsafeMetadata: {
          limit:limit | 0
        }
      })
}, [limit])



    const groq = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true 
    });
    async function main() {
        setlimit(user?.unsafeMetadata?.limit ?? 0)
        urls = new Array();
        setsearch(false);
      
        if(prompt=='')
        {
            console.log('chutiya kuch likhke search maar')
        }
        else{
            setloadin(true)
        const chatCompletion = await getGroqChatCompletion();
        
        const don=String(chatCompletion.choices[0].message.content)
        for(let i=0;i<7;i++){
            songs[i]=don.split('\n')[i+2];
        }
    }
    
    for(let i=0;i<=6;i++){
        let term=songs[i];
        if (!term || term === '') {
            console.log('Please enter a seach term');
        } else {
            const url = `https://itunes.apple.com/search?term=${term}`;
            await fetch(url)
                .then((Response) => Response.json())
                .then((data) => {
                    
                    art = data.results;
                    if(!art[0]){
                        var obj = {url:'/ma.mp3',title:'Your Mom',tags:['okk']};
                       urls.push(obj);
                    }
                    else{
                    var obj = {url:art[0]?.previewUrl,title:art[0]?.trackCensoredName+'-'+art[0]?.artistName,tags:['okk']};
                       urls.push(obj);
                    }
                })
    }}
    setloadin(false)
    setsearch(true)
}
    async function getGroqChatCompletion() {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "any 7 random latest and famous  "+ prompt +"songs names without any description without numbering with atleast don't show the language and singer name " 
                }
            ],
            model: "llama3-8b-8192"
        });
    }
    async function save(){ 
      const secret=`${user.id + user.primaryEmailAddressId }`
      const response=await fetch('https://mus-ai-git-main-0kchinmays-projects.vercel.app/api/register', {
      method:'POST',
       headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret:secret,
      playlist:songs,
      prompt:prompt,
      songInfo:urls,
    }),
  }).then((response)=>(response.json())).then((data)=>{
   
    if(data.status=='ok'){
    console.log(data.status)
    setlimit(limit+1)
    setsaved(!saved)
    setTimeout(() => {
    console.log(saved)
    setsaved(false);
  }, 5000);
    }
    else {
         setrepeat(true)
         setTimeout(() => {
            console.log(saved)
            setrepeat(false);
          }, 5000);
    }
  })
    }
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
    {repeat?<Popup clr='red' name='Playlist exists' className='z-30'/>:<></>}
    {saved?<Popup clr='green' name='Saved' className='z-30'/>:<></>}
        <time dateTime="2016-10-25" suppressHydrationWarning />
        <Nav/>
        {loadin?<ReactLoading className='absolute z-20 top-[23rem] ' type="cylon" color="#287EEC"
                height={300} width={250} />:<></>}
        <div className=' text-black flex flex-col translate-y-[2rem] m-10 p-5 bg-white h-[80%] w-[80rem] rounded-[30px] '>

        
            <input className=' caret-[transparent] bg-slate-300 rounded-[30px] outline-none border-none h-[5rem] w-full p-2  text-xl text-justify pl-10 pr-20 pt-1  capitalize' placeholder='Enter prompt' value={prompt} onChange={event => setprompt(event.target.value)} maxLength={100}/>
            <FaSearch className='absolute translate-y-[10%] cursor-pointer' fontSize={'2.4rem'} opacity={'0.4'} style={{
                right:'3.1rem',
                top:'2.3rem'
            }} onClick={()=>{
                main();
            }}/>
            
            <div className={!search?'hidden':'flex justify-center'}>
            {search? <><div className='absolute rounded-md  h-[75%] w-[90%] translate-y-[4rem] overflow-hidden '><Player  includeTags={false} includeSearch={false} trackList={urls}/>
            </div>
            
             <SignedIn>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-[0.8rem] border border-blue-700 rounded w-[94%]" onClick={()=>{
                if(limit<10){
                save()
                }
                else{
                 alert('save limit')
                }
             }}>Save Playlist</ button>
             </SignedIn>
            </>
            :<></>}
             </div>
        </div>
    </div>
  );
}
