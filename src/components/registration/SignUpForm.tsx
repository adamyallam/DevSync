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
    <div className='flex justify-center bg-gradient-to-tr from-primary to-secondary via-selected items-center h-screen'>
      <form className="" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 p-16 rounded-lg border-2 hover:border-4 hover:cursor-pointer transition-all border-undertone'>
          <h2 className="flex text-primary-text text-3xl font-semibold mb-6 justify-center pb-5 border-b-2 border-undertone">Sign up</h2>
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='First Name'
            value={userData.firstName}
            onChange={(e) => { setUserData({ ...userData, firstName: capitalizeName(e.target.value) }) }}
          />
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='Last Name'
            value={userData.lastName}
            onChange={(e) => { setUserData({ ...userData, lastName: capitalizeName(e.target.value) }) }}
          />
          <input className={`text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70 ${!isUsernameValid ? 'border-2 border-red-500' : ''}`}
            required
            type="text"
            placeholder='Username'
            value={userData.username}
            onChange={(e) => { setUserData({ ...userData, username: e.target.value.toLowerCase() }) }}
          />
          {usernameError && <span className="text-red-500">{usernameError}</span>}
          <input
            className={`text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70 ${!isEmailValid ? 'border-2 border-red-500' : ''}`}
            required
            type="text"
            placeholder='Email'
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="password"
            placeholder='Password'
            value={userData.password}
            onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
          />
          <button className='flex justify-center border-2 border-primary-text p-1 text-primary-text w-[80%] self-center mt-2 hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-all' disabled={loading}>
            {loading && <span>Signing up...</span>}
            {!loading && <span>Sign up</span>}
          </button>
          <span className='flex text-primary-text justify-center gap-1'>Already have an account? <Link href={'signin'} className='text-blue-400 border-blue-400 hover:border-b'>Sign in</Link></span>
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

export default SignUpForm