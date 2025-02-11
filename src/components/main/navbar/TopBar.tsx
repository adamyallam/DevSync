'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import LogoBig from 'src/assets/imgs/LogoBig.png'
import { useSession } from 'next-auth/react';
import useMenuClose from '@/utils/hooks/useMenuClose';
import { signOut } from 'next-auth/react';

export default function TopBar() {
  const { data: session } = useSession()

  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logoutMenu = useRef<HTMLDivElement>(null)
  const logoutMenuButton = useRef<HTMLButtonElement>(null)

  useMenuClose(logoutMenu, logoutMenuButton, logoutOpen, setLogoutOpen)
  

  const userInitials = session ? session?.firstName.trim()[0] + session?.lastName.trim()[0] : 'A'

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
        {session ? (
          <div className='relative flex flex-col items-center gap-5'>
            <button ref={logoutMenuButton} onClick={() => setLogoutOpen(prev => !prev)} className='border-2 border-primary-text rounded-full w-9 h-9 p-1 text-sm text-primary-text mr-3 hover:scale-105 hover:border-secondary-text hover:text-secondary-text transition-transform'>{userInitials}</button>
            {logoutOpen && (
              <div ref={logoutMenu} className='absolute right-[1px] top-12 bg-primary hover:bg-secondary rounded-md shadow-xl p-2'>
                <button onClick={() => signOut()} className='flex text-sm text-primary-text transition-colors'>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className='flex gap-4'>
            <Link href={'/user/registration/signin'} className='border-2 border-primary-text text-primary-text hover:scale-105 hover:border-secondary-text hover:text-secondary-text p-1 h-8 transition-transform text-sm rounded-sm'>Sign in</Link>
            <Link href={'/user/registration/signup'} className='border-2 border-primary-text text-primary-text hover:scale-105 hover:border-secondary-text hover:text-secondary-text p-1 h-8 transition-transform text-sm rounded-sm' >Sign up</Link>
          </div>
        )}
      </div>
    </div>
  )
}
