"use client"
import React, { useState, useEffect } from 'react';
import Socials from '../Images/Socials'

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
        <div className="flex justify-start ml-7 text-2xl">
          <h1>LOGO</h1>
        </div>
        <div className="flex justify-end">
          <button className="border-2 text-white border-black bg-black m-1 p-1">Get Started</button>
          <button className="border-2 border-black m-1 p-1" onClick={toggleMenu}>
            {isOpen ? 'Close' : 'Open'}
          </button>
        </div>
      </div>

      {isOpen && (
      <div className="bg-white h-screen">
        <div className='grid grid-cols-1 grid-rows-9 text-black'>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-t-2 border-b-gray-300 border-t-gray-300 p-3 w-11/12'>dashboard</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-11/12'>About</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-11/12'>Blog</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-11/12'>Contact</button>
          <button className='flex justify-start ml-5 text-lg border-b-2 border-b-gray-300 p-3 w-11/12'>FAQ</button>
            
          
          <div className='bg-gray-100 h-1/3'/>
          
          <div className='flex justify-center items-start'>
            <button className='text-lg bg-black text-white p-3 w-11/12'>Get Started</button>
          </div>

          <div className='flex justify-center mt-1'>
            <button className='text-lg border-2 border-black text-black w-11/12 '>Log In</button>
          </div>
        </div>


        <div className='flex justify-center '>
          <div className='fixed bottom-0 mb-4 '>
            <Socials />
            <p className='flex justify-center'>Follow our socials!</p>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}