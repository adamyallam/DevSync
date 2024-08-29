"use client"
import Image from 'next/image'
import img1 from 'src/assets/imgs/img1.jpg'
import img2 from 'src/assets/imgs/img2.jpg'
import img3 from 'src/assets/imgs/img3.jpg'


export default function GetStartedImages(){

  return (
    <div className=''>
        <div className='grid grid-cols-3 gap-3 mt-5 items-center'>
            <div className='flex justify-center drop-shadow-lg'>
                <Image className='w-3/4 h-3/4' src={img1} alt="" />
            </div>
            <div className='flex justify-center border-2 border-black drop-shadow-lg'>
                <Image src={img2} alt="" />
            </div>
            <div className='flex justify-center drop-shadow-lg'>
                <Image className='w-3/4 h-3/4' src={img3} alt="" />
            </div>
        </div>

        <div className='grid grid-rows-3 text-center mt-5'>
            <h1 className='text-4xl'>Top Quality Organization</h1>
            <p className='mt-1'>Some random text about the app: A more efficient way to build
                projects, keep things organized with projtracker</p>
            <div>
                <button className='border-2 border-black p-1 m-1'>Get Started</button>
            </div>
        </div>
    </div>
  )
} 
