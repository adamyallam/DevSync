'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function DropMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);

      if (!isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
    };

    return (
    <div className='sticky top-0  z-10 bg-white sm:hidden'>
        <div className='grid grid-cols-3 items-center border-b-2 border-black'>
          <div className='flex justify-start'>
            <h1>LOGO</h1>
          </div>
          <div className='flex justify-center'>
            <h1>Get Started</h1>
          </div>


          <div className='flex justify-end'>
            <button className='border-2 border-black m-1 p-1' onClick={(toggleMenu)}>{isOpen ? 'Close' : 'Open'}</button>
          </div>
          
        </div>
        {isOpen && (
                <div className="h-screen w-full bg-gray-800 py-2">
                    
                </div>
            )}
        <div>
        </div>
    </div>

    //   <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center px-6 py-4 z-10">
    //     <div className="flex items-center">
    //       <h1 className="text-xl font-bold mr-4">LOGO</h1>
    //       <h1 className="text-xl">Get Started</h1>
    //     </div>
    //     <div>
    //       <button
    //         onClick={toggleMenu}
    //         className="text-white font-semibold bg-blue-500 px-4 py-2 rounded-md"
    //       >
    //         {isOpen ? 'Close' : 'Open'}
    //       </button>
        //   {isOpen && (
        //     <div className="absolute top-full left-0 w-full bg-gray-800 text-white py-2">
        //       <ul>
        //         <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        //           Menu Item 1
        //         </li>
        //         <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        //           Menu Item 2
        //         </li>
        //         <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        //           Menu Item 3
        //         </li>
        //       </ul>
        //     </div>
        //   )}
    //     </div>
    //   </div>
    );
};