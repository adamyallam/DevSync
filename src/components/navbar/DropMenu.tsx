"use client"
import React, { useState, useEffect } from 'react';
import Socials from '../Images/Socials'
import {Menu} from 'lucide-react'
import {X} from 'lucide-react'
import Image from 'next/image';
import Logo from 'src/assets/imgs/Logo.png'


export default function DropMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'unset' : 'hidden';
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
    <div className={`fixed w-full top-0 z-10 sm:hidden ${hasScrolled ? 'shadow-md' : ''} ${isOpen ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="grid grid-cols-2 items-center border-b-2 border-white">
        <div className="flex justify-start ml-1">
          <Image className='w-14 sm:w-16 p-2' src={Logo} alt="" />
        </div>
        <div className="flex justify-end">
          <button className="border-2 text-white border-black bg-black m-1 p-1">Get Started</button>
          <button className="m-1 p-1" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
      <div className="bg-white h-screen overflow-y-auto">
        <div className='grid grid-cols-1 grid-rows-8 text-black'>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-t-2 border-b-gray-300 border-t-gray-300 p-3 w-80'>dashboard</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-80'>About</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-80'>Blog</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-80'>Contact</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-80'>FAQ</button>
          <div className='bg-gray-100 h-4'/>       
          <div className='flex justify-center items-start'>
            <button className='text-lg bg-black text-white p-3 w-80'>Get Started</button>
          </div>
          <div className='flex justify-center'>
            <button className='text-lg border-2 border-black text-black p-1 w-80 mb-5'>Log In</button>
          </div>
        </div>

        <div className='grid grid-cols-1 grid-rows-3 bg-white'>
          <Socials divClass='flex justify-center row-span-1' imgClass='w-10 h-10'/>
          <p className='flex justify-center row-span-1 text-black'>Follow our socials!</p>
        </div>
      </div>
      )}
    </div>
  );
}