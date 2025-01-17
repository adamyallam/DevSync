'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

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

  const capitalizeName = (name: string) => {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return capitalizedName
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    console.log(userData)

    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    if (res.status === 201) {
      router.push('signin')
    } else {
      console.log('An error occured, please try again later')
      setLoading(false)
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
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='Username'
            value={userData.username}
            onChange={(e) => { setUserData({ ...userData, username: e.target.value.toLowerCase() }) }}
          />
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='Email'
            value={userData.email}
            onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
          />
          <input className="text-primary-text rounded-sm bg-primary placeholder-secondary-text w-80 p-2 pb-1 text-sm bg-opacity-70"
            required
            type="text"
            placeholder='Password'
            value={userData.password}
            onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
          />
          <button className='flex justify-center border-2 border-primary-text p-1 text-primary-text w-[80%] self-center mt-2 hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-all' disabled={loading}>
            {loading && <span>Loading...</span>}
            {!loading && <span>Signup</span>}
          </button>
          <span className='flex text-primary-text justify-center gap-1'>Already have an account? <Link href={'signin'} className='text-blue-400 border-blue-400 hover:border-b'>Sign in</Link></span>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm