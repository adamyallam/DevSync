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
      <div>
        <h1>Signin Page</h1>
        <button type="button" onClick={() => router.push('/api/registration/signup')}>Signup</button>
        <form onSubmit={handleSubmit}>
        <label>
                <span>Email:</span>
                <input 
                    required
                    type="text"
                    value={signInData.email}
                    onChange={(e) => {setSignInData({...signInData, email: e.target.value})}}
                    />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    required
                    type="text"
                    value={signInData.password}
                    onChange={(e) => {setSignInData({...signInData, password: e.target.value})}}
                    />
            </label>
            <button disabled={signingIn}>
                {signingIn && <span>Signing In</span>}
                {!signingIn && <span>Sign In</span>}
            </button>
        </form>
      </div>
    )
  }

  export default SignInForm