"use client"
import { useRouter } from 'next/navigation'

export default function GoToDashboard(){
  const router = useRouter()

  return (
    <div>
        <div className="flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-3xl mb-4 p-3 mt-4 border-b-2 border-gray-400 w-2/5 mx-auto">About Us</h1>
                <p className="mb-4 pl-10 pr-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.
                </p>
                <p className="mb-4 pl-10 pr-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.
                </p>
                <p className="mb-4 pl-10 pr-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.
                </p>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <div className='text-center'>
                <h2 className='text-3xl mb-3 mt-5'>Thank you for taking the time to read about us</h2>
                <p className='text-sm pl-35a pr-35'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in augue nec odio interdum mattis. Proin a
                mauris vel libero venenatis lobortis.
                </p>
                <button className='border-2 border-black p-1 mt-5 mb-3'>Get Started</button>
            </div>
      </div>
    </div>
  )
}
