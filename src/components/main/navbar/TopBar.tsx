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
    <div className={`flex justify-between items-center fixed w-full h-14 top-0 bg-primary ${hasScrolled ? 'shadow-md' : ''}`}>
      <div className='flex items-center'>
        <Link href='/' className='fixed ml-2 w-20'><Image className='p-2' src={LogoBig} alt="" /></Link>
        <div className='flex ml-24 gap-5 text-primary-text text-sm'>
          <Link className='hover:scale-105 hover:text-secondary-text transition-transform' href='/dashboard/home'>Dashboard</Link>
          <Link className='hover:scale-105 hover:text-secondary-text transition-transform' href='/pages/about'>About</Link>
          <Link className='hover:scale-105 hover:text-secondary-text transition-transform' href='/pages/blog'>Blog</Link>
          <Link className='hover:scale-105 hover:text-secondary-text transition-transform' href='/pages/contact'>Contact</Link>
          <Link className='hover:scale-105 hover:text-secondary-text transition-transform' href='/pages/faq'>FAQ</Link>
        </div>
      </div>
      <div className='flex items-center gap-4 mr-3'>
        <button className='border-2 border-primary-text text-primary-text hover:scale-105 hover:border-secondary-text hover:text-secondary-text p-1 h-8 transition-transform text-sm rounded-sm' onClick={() => router.push('user/registration/signin')}>Sign in</button>
        <button className='border-2 border-primary-text text-primary-text hover:scale-105 hover:border-secondary-text hover:text-secondary-text p-1 h-8 transition-transform text-sm rounded-sm' onClick={() => router.push('user/registration/signup')}>Sign up</button>
      </div>
    </div>
  )
}
