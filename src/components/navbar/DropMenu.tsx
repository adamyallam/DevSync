"use client"
import React, { useState, useEffect } from 'react';
import Socials from '../Images/Socials'

export default function DropMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
    <div className={`sticky top-0 z-10 bg-white sm:hidden ${hasScrolled ? 'shadow-md' : 'border-b-2'}`}>
      <div className="grid grid-cols-2 items-center border-b-2 border-white">
        <div className="flex justify-start">
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
          <div>
            <div className="bg-gray-100 h-96">
              <div className='grid grid-cols-1 gird-rows-3 text-black'>
                <button className='flex justify-start ml-5 text-lg border-b-2 p-2 w-11/12'>Go to dashboard</button>
                <button className='flex justify-start ml-5 text-lg border-b-2 p-2 w-11/12'>About</button>
                <button className='flex justify-start ml-5 text-lg border-b-2 p-2 w-11/12'>Blog</button>
              </div>
              <div className='grid grid-cols-1 grid-rows-2 m-2'> 
                <div className='flex justify-center'>
                  <button className='border-2 text-lg bg-black text-white p-2 w-11/12'>Get Started</button>
                </div>
                <div className='flex justify-center'>
                  <button className='border-2 text-lg bg-black text-white p-2 w-11/12'>Log In</button>
                </div>
              </div>
            </div>
            <div className='bg-gray-200 h-22 p-2'>
              <div className='mt-1'>
              <Socials />
              </div>
              <p className='flex justify-center mt-2'>Follow our socials!</p>
            </div>
          </div>
      )}
    </div>
  );
}