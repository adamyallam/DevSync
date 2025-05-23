'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
  const router = useRouter()
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
        <form onSubmit={handleSubmit} className="rounded-xl shadow-xl px-8 py-8 w-full max-w-lg flex flex-col items-center gap-4 border border-undertone bg-highlighted">
          <h2 className="text-3xl font-bold text-primary-text text-center mb-1">Sign in</h2>
          <p className="text-primary-text text-center text-base mb-1">Welcome back! Please sign in to your account.</p>
          {errorMessage && <p className="text-red-500 text-center text-sm">Invalid email or password. Please try again.</p>}
          <input
            className="rounded-md border border-undertone text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted focus:outline-none focus:ring-2 focus:ring-selected"
            required
            type="text"
            placeholder="Email or Username"
            value={signInData.email}
            onChange={(e) => { setSignInData({ ...signInData, email: e.target.value }) }}
            disabled={signingIn}
          />
          <input
            className="rounded-md border border-undertone text-primary-text placeholder-primary-text w-full p-2 text-sm bg-highlighted focus:outline-none focus:ring-2 focus:ring-selected"
            required
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={(e) => { setSignInData({ ...signInData, password: e.target.value }) }}
            disabled={signingIn}
          />
          <button
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-text font-semibold py-2 rounded-md hover:bg-button-hover transition-all disabled:opacity-60 border border-undertone"
            disabled={signingIn}
          >
            {signingIn ? <span>Signing In...</span> : <span>Sign In</span>}
          </button>
          <button
            type="button"
            onClick={viewDemo}
            className="flex items-center justify-center gap-2 w-full border bg-primary border-undertone text-primary-text font-semibold py-2 rounded-md hover:bg-secondary hover:text-secondary-text transition-all"
            disabled={signingIn}
          >
            View Demo
          </button>
          <span className="text-xs text-red-400 font-semibold text-center">Note: Data will not be saved in demo mode.</span>
          <div className="text-center mt-1">
            <span className='text-primary-text'>Don&apos;t have an account? </span>
            <Link href={'signup'} className="text-blue-400 hover:underline">Sign up here</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default SignInForm