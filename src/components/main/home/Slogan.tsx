'use client'
import { useRouter } from "next/router"


export default function Slogan(){


  return (
    <div className='mt-24'>
      <div className='grid grid-cols-1 grid-rows-3 gap-2 mt-'>
        <div className='flex justify-center'>
          <h1 className='text-3xl'>SLOGAN</h1>
        </div>
        <div className='flex justify-center text-center'>
          <h1>Brief description of what app does and the usage</h1>
        </div>
        <div className='flex justify-center'>
        <button className='border-2 border-black p-1 '>Get Started</button>
        </div>
      </div>
    </div>
  )
}
