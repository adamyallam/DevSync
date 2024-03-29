"use client"
import { useRouter } from 'next/navigation'


export default async function Home(){
  const router = useRouter()

  return (
    <div className='grid grid-cols-1 grid-rows-3 gap-2 m-4'>
      <div className='flex justify-center'>
        <h1>SLOGAN</h1>
      </div>
      <div className='flex justify-center'>
        <h1>222222222222222222222222222222</h1>
      </div>
      <div className='flex justify-center'>
        <h1>333333333333333333333333333333</h1>
      </div>
    </div>
  )
}
