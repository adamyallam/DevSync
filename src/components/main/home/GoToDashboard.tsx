"use client"

export default function GoToDashboard(){

  return (
    <div className=''>
        <div className="grid grid-cols-4 grid-rows-2 items-center border-b-2 border-black">
            <div className="flex justify-start col-span-2">
                <h1 className='mt-10 text-3xl ml-5 sm:text-4xl md:text-5xl lg:ml-28'>Dashboard</h1>
            </div>
            <div className='flex justify-center text-center pl-5 pb-5 pt-5 col-span-2 row-span-2'>
                <h2 className='md:hidden'>Your workspace all in one place. Create and manage projects, check schedules, message other users and much more!</h2>
                <h2 className='hidden md:block'>Your workspace all in one place. Create and manage projects, check schedules, message other users and much more!
                    Its simple use allows anyone to use and is great for teams with varying skill levels. Helpp keep track of projects with
                    Project Tracker!
                </h2>
            </div>
            <div className='col-span-2'>
                <button className='text-base mb-20 ml-5 lg:ml-28'>Go to dashboard ➞</button>
            </div>
        </div>
    </div>
  )
}
