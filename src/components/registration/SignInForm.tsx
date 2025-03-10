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
    <div className='flex justify-center bg-gradient-to-tr from-primary to-secondary via-selected items-center h-screen'>
      <form onSubmit={handleSubmit} className='relative'>
        <div className='flex flex-col gap-2 p-16 rounded-lg border-2 hover:border-4 hover:cursor-pointer transition-all border-undertone'>
          <h2 className="flex text-primary-text text-5xl mb-6 justify-center pb-5 border-b-2 border-undertone">Sign in</h2>
          {errorMessage && <p className="text-red-500 text-center">Invalid email or password. Please try again.</p>}
          <input className="rounded-sm text-primary-text bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='Email or Username'
            value={signInData.email}
            onChange={(e) => { setSignInData({ ...signInData, email: e.target.value }) }}
          />
          <input className="rounded-sm text-primary-text bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="password"
            placeholder='Password'
            value={signInData.password}
            onChange={(e) => { setSignInData({ ...signInData, password: e.target.value }) }}
          />
          <button className='flex justify-center border-2 border-primary-text p-1 text-primary-text w-[80%] self-center mt-2 hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-all' disabled={signingIn}>
            {signingIn && <span>Signing In...</span>}
            {!signingIn && <span>Sign In</span>}
          </button>
          <span className='flex text-primary-text justify-center gap-1'>Don&apos;t have an account? <Link href={'signup'} className='text-blue-400 border-blue-400 hover:border-b'>Sign up</Link></span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <button onClick={viewDemo} className='w-[80%] flex justify-center items-center rounded-sm text-primary-text text-md mt-4 border-2 border-primary-text p-1 hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-all'>
            View Demo
          </button>
          <span className="text-secondary-text text-center mt-2">Note: Data will not be saved in demo mode</span>
        </div>
      </form>
    </div>
  )
}

export default SignInForm