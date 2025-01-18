'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const SignInForm = () => {
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

      if(newSignIn?.error) {
        console.log(newSignIn.error)
        setSigningIn(false)
      } else {
        router.push('/dashboard/home')
      }
    }

    return (
      <div className='flex justify-center bg-gradient-to-tr from-primary to-secondary via-selected items-center h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 p-16 rounded-lg border-2 hover:border-4 hover:cursor-pointer transition-all border-undertone'>
            <h2 className="flex text-primary-text text-5xl mb-6 justify-center pb-5 border-b-2 border-undertone">Sign in</h2>
              <input className="rounded-sm text-primary-text bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
                required
                type="text"
                placeholder='Email'
                value={signInData.email}
                onChange={(e) => {setSignInData({...signInData, email: e.target.value})}}
                />
              <input className="rounded-sm text-primary-text bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
                required
                type="password"
                placeholder='Password'
                value={signInData.password}
                onChange={(e) => {setSignInData({...signInData, password: e.target.value})}}
                />
            <button className='flex justify-center border-2 border-primary-text p-1 text-primary-text w-[80%] self-center mt-2 hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-all' disabled={signingIn}>
              {signingIn && <span>Signing In...</span>}
              {!signingIn && <span>Sign In</span>}
            </button>
            <span className='flex text-primary-text justify-center gap-1'>Don't have an account? <Link href={'signup'} className='text-blue-400 border-blue-400 hover:border-b'>Sign up</Link></span>
          </div>
        </form>
      </div>
    )
  }

  export default SignInForm