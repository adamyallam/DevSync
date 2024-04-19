"use client"
import { useRouter } from 'next/navigation'

export default function Contact(){
  const router = useRouter()

  return (
    <div>
        <h1 className='flex justify-center text-3xl mb-96 mt-24'>Contact</h1>
    </div>
  )
}
