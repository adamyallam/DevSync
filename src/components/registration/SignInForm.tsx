'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

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
        router.push('/dashboard')
      }
    }

    return (
      <div className='flex justify-center bg-gradient-to-tr from-orange-500 to-gray-600 via-secondary items-center h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 p-16 rounded-lg border-2 border-primary'>
            <h2 className="flex text-primary text-5xl mb-6 justify-center pb-5 border-b-2 border-primary">Signin</h2>
              <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                required
                type="text"
                placeholder='Email'
                value={signInData.email}
                onChange={(e) => {setSignInData({...signInData, email: e.target.value})}}
                />
              <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                required
                type="text"
                placeholder='Password'
                value={signInData.password}
                onChange={(e) => {setSignInData({...signInData, password: e.target.value})}}
                />
            <button className='flex justify-center border-2 p-1 text-primary' disabled={signingIn}>
              {signingIn && <span>Signing In</span>}
              {!signingIn && <span>Sign In</span>}
            </button>
            <p className='flex text-primary justify-center'>Forgot Username or Password?</p>
          </div>
        </form>
      </div>
    )
  }

  export default SignInForm