'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoBig from 'src/assets/imgs/LogoBig.png'


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
    <div className={`hidden fixed w-full h-14 top-0 z-10 bg-white ${hasScrolled ? 'shadow-md' : ''} sm:block`}>
      <div className='grid grid-cols-2'>
          <div className='flex items-center'>
            <Link href='/' className='fixed ml-2 mt-3 w-20 '><Image className='p-2' src={LogoBig} alt="" /></Link>
            <div className='flex ml-24 gap-5 mt-2'>
              <Link href='/dashboard/home'><button>Dashboard</button></Link>
              <Link href='/pages/about'><button>About</button></Link>
              <Link href='/pages/blog'><button>Blog</button></Link>
              <Link href='/pages/contact'><button>Contact</button></Link>
              <Link href='/pages/faq'><button>FAQ</button></Link>
            </div>
          </div>
        <div className='flex justify-end mt-2 gap-1'>
          <button className='border-2 border-black  p-1' onClick={() => router.push('/registration/signin')}>Sign in</button>
          <button className='border-2 border-black  p-1' onClick={() => router.push('/registration/signup')}>Sign up</button>
        </div>
      </div>
    </div>
  )
}
