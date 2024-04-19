"use client"
import { useRouter } from 'next/navigation'

export default function Faq(){
  const router = useRouter()

  return (
    <div>
        <h1 className='flex justify-center text-3xl mb-96 mt-24'>FAQ</h1>
    </div>
  )
}
