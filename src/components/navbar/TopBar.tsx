'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';


export default function TopBar() {
  const router = useRouter();  
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`hidden fixed w-full top-0 z-10 bg-white ${hasScrolled ? 'shadow-md' : ''} sm:block`}>
      <div className='grid grid-cols-3 items-center'>
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
