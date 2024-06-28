import Link from 'next/link'
export default function Home() {
  return (
    <>
    <div className='cusImg flex items-center justify-center h-screen bg-fixed bg-center bg-cover mb-[4rem]'>
       <div className='absolute top-0 left-0 right-0 bottom-0 bg-black h-screen opacity-[0.6] z-[2]'/>
       <div className=' absolute text-white mt-[-10rem] z-[3] p-5'>
       <h2 className='text-5xl font-bold'>Embrace Creativity</h2>
       <p className='py-5 text-xl'>I caput moments in nature and keep them dead.</p>
       <button className=' py-2 px-6 border'><Link href='/Create'>Create</Link></button>
       </div>
    </div>
    </>
  );
}
