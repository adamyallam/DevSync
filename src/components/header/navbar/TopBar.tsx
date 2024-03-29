'use client'
import { useRouter } from 'next/navigation'


export default async function TopBar() {
  const router = useRouter();  

  return (
    <div>
      <div className='grid grid-cols-3 items-center border-b-2 border-black'>
        <div className='flex justify-start'>
          <h1>LOGO</h1>
        </div>
        <div className='flex justify-center'>
          <h1>HEADER</h1>
        </div>
        <div className='flex justify-end'>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/signin')}>Sign in</button>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/Sign Up')}>Sign up</button>
        </div>
      </div>

    </div>
  )
}
