import Logo from 'src/assets/imgs/Logo.png'
import LogoBig from 'src/assets/imgs/LogoBig.png'
import Image from 'next/image';
import Socials from '../Images/Socials'

export default function GoToDashboard(){

  return (
    <div>
      <div className='grid grid-cols-1 grid-rows-3 bg-gray-800 h-64'>
        <div className='flex justify-center'>
          <Image className='w-16 h-16 mt-7' src={Logo} alt="" />
        </div>
        <div className="flex justify-center text-center text-gray-300 mt-5">
          <ul>
            <li>
              <a href='/Dashboard'>Dashboard</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/blog'>Blog</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
            <li>
              <a href='/faq'>FAQ</a>
            </li>
          </ul>
         </div>

      </div>
      <div className='grid grid-cols-1 grid-rows-4 bg-gray-700'>
        <p className='flex justify-center text-gray-200 mt-6 mb-3'>Stay in touch by joining our newsletter!</p>
        <div className="flex justify-center">
           <input
             type="email"
             placeholder="Enter your email"
             className="border-2 border-black p-1 w-34 h-10"
           />
           <button className="bg-black text-white p-1 w-20 h-10">Sign Up</button>
         </div>
         <Socials divClass='flex justify-center mt-4' imgClass='h-10 w-10' />
         <p className='flex justify-center text-gray-200'>Follow our socials!</p>
      </div>
    </div>
  )
}
