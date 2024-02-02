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
            router.push('/api/user/signin')
        } else {
            console.log('An error occured, please try again later')
        }
    }

    return (
      <div>
        <h1>Signup Page</h1>
        <button type="button" onClick={() => router.push('/')}>Home</button>
        
        <form onSubmit={handleSubmit}>
            <label>
                <span>First Name:</span>
                <input 
                    required
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => {setUserData({...userData, firstName: e.target.value})}}
                    />
            </label>
            <label>
                <span>Last Name:</span>
                <input 
                    required
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => {setUserData({...userData, lastName: e.target.value})}}
                    />
            </label>
            <label>
                <span>Username:</span>
                <input 
                    required
                    type="text"
                    value={userData.username}
                    onChange={(e) => {setUserData({...userData, username: e.target.value})}}
                    />
            </label>
            <label>
                <span>Email:</span>
                <input 
                    required
                    type="text"
                    value={userData.email}
                    onChange={(e) => {setUserData({...userData, email: e.target.value})}}
                    />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    required
                    type="text"
                    value={userData.password}
                    onChange={(e) => {setUserData({...userData, password: e.target.value})}}
                    />
            </label>
            <button disabled={loading}>
                {loading && <span>Submitting</span>}
                {!loading && <span>Submit</span>}
            </button>
        </form>
      </div>
    )
  }

  export default SignUpForm