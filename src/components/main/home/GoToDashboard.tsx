"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function GoToDashboard() {

  const router = useRouter()

  const [signingIn, setSigningIn] = useState(false)
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSigningIn(true)

    const newSignIn = await signIn('credentials', {
      ...signInData,
      redirect: false
    })

    if (newSignIn?.error) {
      console.log(newSignIn.error)
      setSigningIn(false)
    } else {
      router.push('/dashboard/home')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link href={'/dashboard/home'} className="text-primary-text text-lg font-semibold hover:cursor-pointer hover:text-secondary-text transition-all hover:border-b-[3px] pt-2 border-highlighted">The dashboard is where it all begins</Link>

      <div className="flex justify-evenly w-full mt-10">

        <div className="flex flex-col items-center justify-center border-2 border-undertone w-[30%] h-64 p-5 hover:border-4 hover:cursor-pointer transition-all rounded-md">
          <div className="flex flex-col items-center gap-3 w-full">
            <Link className="flex items-center justify-center gap-2 text-primary-text font-semibold border-2 border-primary-text w-[80%] p-3 hover:text-secondary-text hover:border-secondary-text transition-all" href={'dashboard/home'}>Go to dashboard <ArrowRight size={18} strokeWidth={3} /></Link>

            <span className="text-primary-text">Continue working on your projects</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border-2 border-undertone p-5 w-[30%] h-64 hover:border-4 hover:cursor-pointer transition-all">
          <div className='flex flex-col gap-2'>

            <h2 className="flex text-primary-text text-2xl justify-center border-b-2 border-undertone pb-1">Sign in</h2>

            <input className="rounded-sm text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted"
              required
              type="text"
              placeholder='Email'
              value={signInData.email}
              onChange={(e) => { setSignInData({ ...signInData, email: e.target.value }) }}
            />
            <input className="rounded-sm text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted"
              required
              type="text"
              placeholder='Password'
              value={signInData.password}
              onChange={(e) => { setSignInData({ ...signInData, password: e.target.value }) }}
            />
            <button className='flex justify-center border-2 border-primary-text font-semibold p-1 text-primary-text hover:border-secondary-text hover:text-secondary-text transition-all' disabled={signingIn}>
              {signingIn && <span>Signing In</span>}
              {!signingIn && <span>Sign In</span>}
            </button>
            <div>
              <span className='flex gap-1 text-primary-text justify-center'>Don't have an account? <Link href={'user/registration/signup'} className="text-blue-400 hover:border-b border-blue-400 transition-all">Sign up here</Link></span>
            </div>
          </div>
        </form>


      </div>
    </div >
  )
}
