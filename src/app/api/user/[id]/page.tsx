'use client'
import { useSearchParams } from 'next/navigation'

export default function UserDetails(){
    const searchParams = useSearchParams()
    const userid = searchParams.get('id')
    return (
      <div>
        <h1>User id: {userid}</h1>
      </div>
    )
  }
  