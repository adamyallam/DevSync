"use client"
import { useRouter } from 'next/navigation'


export default function Slogan(){
  const router = useRouter()

  return (
    <div className=''>
      <div className='grid grid-cols-1 grid-rows-3 gap-2 mt-4'>
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
