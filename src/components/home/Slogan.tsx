"use client"
import { useRouter } from 'next/navigation'


export default function Slogan(){
  const router = useRouter()

  return (
    <div className=''>
      <div className='grid grid-cols-1 grid-rows-3 gap-2 m-4'>
        <div className='flex justify-center'>
          <h1>SLOGAN</h1>
        </div>
        <div className='flex justify-center'>
          <h1>Brief description of what app does and the usage</h1>
        </div>
        <div className='flex justify-center'>
          <h1>"get started button"</h1>
        </div>
      </div>
    </div>
  )
}
