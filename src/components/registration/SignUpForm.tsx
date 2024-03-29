'use client'
import { useRouter } from 'next/navigation'
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })

        if (res.status === 201) {
            router.push('/registration/signin')
        } else {
            console.log('An error occured, please try again later')
            setLoading(false)
        }
    }

    return (
    <div className='flex justify-center bg-gradient-to-tr from-orange-500 to-gray-600 via-secondary items-center h-screen'>
        <form className="" onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 p-16 rounded-lg border-2 border-primary p-15'>
                <h2 className="flex text-primary text-5xl mb-6 justify-center pb-5 border-b-2 border-primary">Signup</h2>
                <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                    required
                    type="text"
                    placeholder='First Name'
                    value={userData.firstName}
                     onChange={(e) => {setUserData({...userData, firstName: e.target.value})}}
                     />
                <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                    required
                    type="text"
                    placeholder='Last Name'
                    value={userData.lastName}
                    onChange={(e) => {setUserData({...userData, lastName: e.target.value})}}
                    />
                <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                    required
                    type="text"
                    placeholder='Username'
                    value={userData.username}
                    onChange={(e) => {setUserData({...userData, username: e.target.value})}}
                    />
                <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                    required
                    type="text"
                    placeholder='Email'
                     value={userData.email}
                     onChange={(e) => {setUserData({...userData, email: e.target.value})}}
                     />
                <input className="rounded-sm bg-white placeholder-primary w-80 p-2 pb-1 text-sm bg-opacity-40"
                    required
                    type="text"
                    placeholder='Password'
                    value={userData.password}
                    onChange={(e) => {setUserData({...userData, password: e.target.value})}}
                    />
                <button className='flex justify-center border-2 p-1 text-primary' disabled={loading}>
                    {loading && <span>Loading...</span>}
                    {!loading && <span>Signup</span>}
                </button>
                <p className='flex text-primary justify-center'>Already have an account? Signin</p>
            </div>
        </form>
    </div>
    )
  }

  export default SignUpForm