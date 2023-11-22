import { NextResponse } from "next/server"
import createUser from "script"

export const POST = async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password } = await req.json();
    
    try {
        const userData = { firstName, lastName, username, email, password}
        createUser(userData)
        return NextResponse.json(
            { message: 'New user created!' },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to POST', err}, 
            { status: 500 }
        )
    }
}