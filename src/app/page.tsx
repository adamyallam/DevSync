'use client'
import { useRouter } from 'next/navigation'


export default async function HomePage(){
  const router = useRouter()

  return (
    <div>
      <h1>Home Page</h1>
      <button type="button" onClick={() => router.push('/registration/signin')}>Signin</button> 
      <button type="button" onClick={() => router.push('/registration/signup')}>Signup</button> 
      <button type="button" onClick={() => router.push('/dashboard')}>Dashboard</button>
    </div>
  )
}
