'use client'
import { useRouter } from 'next/navigation'


export default function TopBar() {
  const router = useRouter();  

  return (
    <div className='hidden sticky top-0 z-10 bg-white sm:block'>
      <div className='grid grid-cols-3 items-center border-b-2 border-black'>
        <div className='flex justify-start'>
          <h1>LOGO</h1>
        </div>
        <div className='flex justify-center'>
          <h1>HEADER</h1>
        </div>
        <div className='flex justify-end'>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/signin')}>Sign in</button>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/signup')}>Sign up</button>
        </div>
      </div>
    </div>
  )
}
