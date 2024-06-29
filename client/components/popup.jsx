import React from 'react'
import { useEffect, useState } from 'react';
import { setTimeout } from 'timers';
function popup({name}) {
    const [visi, setvisi] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setvisi(!visi)
        }, 2000);
    
        return () => clearTimeout(timeoutId);
      }, []);

   
  return (
    <div className={`fixed inset-x-0 bottom-0 flex items-end justify-right px-4 py-6 justify-end z-50 transition-opacity ease-in ${visi? 'opacity-100' : 'opacity-0' }`}>
    <div
        className={`max-w-sm w-full shadow-lg rounded px-4 py-3 relative bg-blue-400 border-l-4 border-blue-700 text-white`}>
        <div className="p-2">
            <div className="flex items-start">
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm leading-5 font-medium">
                        {name}
                    </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button className="inline-flex text-white transition ease-in-out duration-150"
                    onClick={()=>{return this.parentNode.parentNode.parentNode.parentNode.remove()}}
                    >
                       <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                       </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default popup
