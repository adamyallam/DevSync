"use client"
import { useRouter } from 'next/navigation'

export default function Blog(){
  const router = useRouter()

  return (
    <div>
        <h1 className='flex justify-center text-3xl mb-96 mt-4'>Blog</h1>
    </div>
  )
}
