"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import {MenuIcon, X, Instagram, Twitter, Linkedin} from 'lucide-react'
import Image from 'next/image';
import Logo from 'src/assets/imgs/Logo.png'


export default function DropMenu() {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setisSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? 'unset' : 'hidden';
  };

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
    <div className={`fixed w-full top-0 z-10 sm:hidden ${hasScrolled ? 'shadow-md' : ''} bg-primary`}>
      <div className="grid grid-cols-2 items-center border-b-2 border-undertone">
        <div className="flex justify-start ml-1">
          <Link href='/'><Image className='w-14 sm:w-16 p-2' src={Logo} alt="" onClick={toggleMenu}/></Link>
        </div>
        <div className="flex justify-end">
          <Link href='user/registration/signup'><button className="border-2 text-white border-black bg-black m-1 p-1 hover:scale-105 transition-transform">Get Started</button></Link>
          <button className="m-1 p-1" onClick={toggleMenu}>
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isSidebarOpen && (
      <div className="bg-secondary h-screen overflow-y-auto">
        <div className='grid grid-cols-1 grid-rows-8 text-primary-text'>
          <Link href='/dashboard/home'><button onClick={toggleMenu} className='flex justify-start ml-5 text-lg border-b-2 border-t-2 border-b-undertone border-t-undertone p-3 w-11/12 hover:bg-highlighted transition-all' >dashboard</button></Link>
          <Link href='/pages/about'><button onClick={toggleMenu} className='flex justify-start ml-5 text-lg border-b-2 border-b-undertone p-3 w-11/12 hover:bg-highlighted transition-all'>About</button></Link>
          <Link href='/pages/blog'><button onClick={toggleMenu} className='flex justify-start ml-5 text-lg border-b-2 border-b-undertone p-3 w-11/12 hover:bg-highlighted transition-all'>Blog</button></Link>
          <Link href='/pages/contact'><button onClick={toggleMenu} className='flex justify-start ml-5 text-lg border-b-2 border-b-undertone p-3 w-11/12 hover:bg-highlighted transition-all'>Contact</button></Link>
          <Link href='/pages/faq'><button onClick={toggleMenu} className='flex justify-start ml-5 text-lg border-b-2 border-b-undertone p-3 w-11/12 hover:bg-highlighted transition-all'>FAQ</button></Link>
          <div className='bg-undertone h-4'/>       
          <div className='flex justify-center items-start'>
            <Link href='user/registration/signup'><button className='text-lg bg-black text-white p-3 w-80  hover:scale-105 transition-transform'>Get Started</button></Link>
          </div>
          <div className='flex justify-center'>
            <Link href='user/registration/signin'><button className='text-lg border-2 border-black text-primary-text p-1 w-80 mb-5  hover:scale-105 transition-transform'>Log In</button></Link>
          </div>
        </div>

        <div className='flex flex-col items-center bg-undertone p-2'>
          <div className='flex gap-2'>
            <Instagram size={24} className='text-primary-text' strokeWidth={1.5} />
            <Twitter size={24} className="text-primary-text" strokeWidth={1.5} />
            <Linkedin size={24} className="text-primary-text" strokeWidth={1.5} />
          </div>
          <p className=' text-primary-text'>Follow our socials!</p>
        </div>
      </div>
      )}
    </div>
  );
}