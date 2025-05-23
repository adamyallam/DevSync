'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const SignUpForm = () => {
  const router = useRouter()

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const capitalizeName = (name: string) => {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return capitalizedName
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z]+$/; // Only letters, no spaces
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const emailValid = validateEmail(userData.email);
    const usernameValid = validateUsername(userData.username);
    setIsEmailValid(emailValid);
    setIsUsernameValid(usernameValid);

    if (!emailValid) {
      setLoading(false);
      setIsEmailValid(false);
      return;
    } else if (!usernameValid) {
      setLoading(false);
      setIsUsernameValid(false);
      return;
    }

    setLoading(true);
    setEmailError('');
    setUsernameError('');

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (res.status === 201) {
      router.push('signin');
    } else {
      const data = await res.json();
      if (data.message.includes('email')) {
        setEmailError('Email is unavailable');
      }
      if (data.message.includes('username')) {
        setUsernameError('Username is unavailable');
      }
      setLoading(false);
    }
  };

  const viewDemo = async (e: any) => {
    e.preventDefault()

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
    } else {
      router.push('/dashboard/home')
      router.refresh()
    }

  }

  return (
    <div className="flex flex-col w-full h-screen bg-primary">
      <main className="flex flex-1 items-center justify-center py-8 bg-highlighted">
        <form onSubmit={handleSubmit} className="rounded-xl shadow-xl px-8 py-8 w-full max-w-lg flex flex-col items-center gap-4 border border-undertone bg-highlighted">
          <h2 className="text-3xl font-bold text-primary-text text-center mb-1">Sign up</h2>
          <input className="text-primary-text rounded-md border border-undertone bg-highlighted placeholder-primary-text w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-selected"
            required
            type="text"
            placeholder='First Name'
            value={userData.firstName}
            onChange={(e) => { setUserData({ ...userData, firstName: capitalizeName(e.target.value) }) }}
          />
          <input className="text-primary-text rounded-md border border-undertone bg-highlighted placeholder-primary-text w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-selected"
            required
            type="text"
            placeholder='Last Name'
            value={userData.lastName}
            onChange={(e) => { setUserData({ ...userData, lastName: capitalizeName(e.target.value) }) }}
          />
          <input className={`text-primary-text rounded-md border border-undertone bg-highlighted placeholder-primary-text w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-selected ${!isUsernameValid ? 'border-2 border-red-500' : ''}`}
            required
            type="text"
            placeholder='Username'
            value={userData.username}
            onChange={(e) => { setUserData({ ...userData, username: e.target.value.toLowerCase() }) }}
          />
          {usernameError && <span className="text-red-500 text-xs">{usernameError}</span>}
          <input
            className={`text-primary-text rounded-md border border-undertone bg-highlighted placeholder-primary-text w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-selected ${!isEmailValid ? 'border-2 border-red-500' : ''}`}
            required
            type="text"
            placeholder='Email'
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          {emailError && <span className="text-red-500 text-xs">{emailError}</span>}
          <input className="text-primary-text rounded-md border border-undertone bg-highlighted placeholder-primary-text w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-selected"
            required
            type="password"
            placeholder='Password'
            value={userData.password}
            onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
          />
          <button className='flex items-center justify-center gap-2 w-full bg-primary text-primary-text font-semibold py-2 rounded-md hover:bg-button-hover transition-all disabled:opacity-60 border border-undertone mt-1' disabled={loading}>
            {loading && <span>Signing up...</span>}
            {!loading && <span>Sign up</span>}
          </button>
          <button type="button" onClick={viewDemo} className='flex items-center justify-center gap-2 w-full border bg-primary border-undertone text-primary-text font-semibold py-2 rounded-md hover:bg-secondary hover:text-secondary-text transition-all'>
            View Demo
          </button>
          <span className="text-xs text-red-400 font-semibold text-center">Note: Data will not be saved in demo mode.</span>
          <div className="text-center mt-1 w-full">
            <span className='text-primary-text'>Already have an account? </span>
            <Link href={'signin'} className="text-blue-400 hover:underline">Sign in</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default SignUpForm