'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from 'src/assets/imgs/Logo.png'
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
    <div className={`hidden fixed w-full top-0 z-10 bg-white ${hasScrolled ? 'shadow-md' : ''} sm:block`}>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex justify-start gap-5'>
          <Image className='sm:h-20 p-2 md:w-32 lg:w-30 xl:w-32' src={LogoBig} alt="" />
          <div className='flex gap-5 items-center'>
            <Link href='/dashboard'><button>Dashboard</button></Link>
            <Link href='/about'><button>About</button></Link>
            <Link href='/blog'><button>Blog</button></Link>
            <Link href='/contact'><button>Contact</button></Link>
            <Link href='/faq'><button>FAQ</button></Link>
          </div>
        </div>
        <div className='flex justify-end'>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/signin')}>Sign in</button>
          <button className='border-2 border-black m-1 p-1' onClick={() => router.push('/registration/signup')}>Sign up</button>
        </div>
      </div>
    </div>
  )
}
