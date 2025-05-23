"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, LogIn } from "lucide-react"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import LogoBig from 'src/assets/imgs/LogoBig.png'

export default function HomeLanding() {
  const router = useRouter()
  const { data: session } = useSession()
  const [signingIn, setSigningIn] = useState(false)
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSigningIn(true)
    setErrorMessage(null)

    const newSignIn = await signIn('credentials', {
      ...signInData,
      redirect: false,
    })

    if (newSignIn?.error) {
      console.log(newSignIn.error)
      setSigningIn(false)
      setSignInData({ email: '', password: '' })
      setErrorMessage('Invalid email or password. Please try again.')
    } else {
      setSigningIn(false)
      router.push('/dashboard/home')
    }
  }

  const viewDemo = async (e: any) => {
    e.preventDefault()
    setSigningIn(true)
    setErrorMessage(null)

    const demoUser = {
      email: "demouser@gmail.com",
      password: "demo321",
    }

    const newSignIn = await signIn('credentials', {
      ...demoUser,
      redirect: false
    })

    if (newSignIn?.error) {
      console.log(newSignIn.error)
      setSigningIn(false)
      setSignInData({ email: '', password: '' })
      setErrorMessage('Invalid email or password. Please try again.')
    } else {
      router.push('/dashboard/home')
      router.refresh()
    }

  }

  return (
    <div className="flex flex-col w-full h-screen bg-primary">

      <main className="flex flex-1 items-center justify-center py-8 bg-highlighted">
        <div className="rounded-xl shadow-xl px-8 py-10 w-full max-w-lg flex flex-col items-center gap-8 border border-undertone">
          <Image src={LogoBig} alt="Logo" width={64} height={64} className="mb-2" />
          <h1 className="text-3xl font-bold text-primary-text text-center">Welcome to DevSync</h1>
          <p className="text-primary-text text-center text-base mb-2">Organize, track, and manage your projects with ease.</p>

          {session ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <span className="text-lg text-primary-text">You are already signed in.</span>
              <Link href="/dashboard/home" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-text font-semibold py-2 rounded-md hover:bg-button-hover transition-all border border-undertone">
                Go to Dashboard <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
              <input
                className="rounded-md border border-undertone text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted focus:outline-none focus:ring-2 focus:ring-selected"
                required
                type="text"
                placeholder='Email or Username'
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                disabled={signingIn}
              />
              <input
                className="rounded-md border border-undertone text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted focus:outline-none focus:ring-2 focus:ring-selected"
                required
                type="password"
                placeholder='Password'
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                disabled={signingIn}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-text font-semibold py-2 rounded-md hover:bg-button-hover transition-all disabled:opacity-60 border border-undertone"
                disabled={signingIn}
              >
                {signingIn ? <span>Signing In...</span> : <><LogIn size={18} /> Sign In</>}
              </button>
              <button
                type="button"
                onClick={viewDemo}
                className="flex items-center justify-center gap-2 w-full border bg-primary border-undertone text-primary-text font-semibold py-2 rounded-md hover:bg-secondary hover:text-secondary-text transition-all"
                disabled={signingIn}
              >
                <ArrowRight size={18} /> View Demo
              </button>
              <span className="text-xs text-red-400 font-semibold text-center">Note: Data will not be saved in demo mode.</span>
              <div className="text-center mt-2">
                <span className='text-primary-text'>Don&apos;t have an account? </span>
                <Link href={'/user/registration/signup'} className="text-blue-400 hover:underline">Sign up here</Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
