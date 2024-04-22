import { NextRequest, NextResponse } from "next/server"
import { db, createUser, deleteUser, updateUser, readUser, readAllUsers} from "src/db/db-connections/user"
import { hash } from 'bcrypt'
import { authOptions } from 'src/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

//API to add or "POST" a user (invokes "createUser")
export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    const { firstName, lastName, username, email, password } = await req.json();
    const hashedPassword = await hash(password, 10)
    
    try {
        if (!session) {
            const userData = { firstName, lastName, username, email, password: hashedPassword}

            // check if email already exists
            const existingEmail = await db.user.findUnique({
                where: {
                    email: email
                }
            })
            if (existingEmail) {
                return NextResponse.json(
                    {message: 'User with that email already exists!'},
                    {status: 409}
                )
            }
            // check if username already exists
            const existingUsername = await db.user.findUnique({
                where: {
                    username: username
                }
            })
            if (existingUsername) {
                return NextResponse.json(
                    {message: 'User with that username already exists!'},
                    {status: 409}
                )
            }

            createUser(userData)
            return NextResponse.json(
                { message: 'New user created!' },
                { status: 201 }
            )
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to POST', err}, 
            { status: 500 }
        )
    }
}

//API to DELETE a user (invokes "deleteUser")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();

    // const session = await getServerSession(authOptions)
 
    try {
        const userId = {id}
        // if (session?.user.id === userId.toString()) { 
            deleteUser(userId)
            return NextResponse.json(
                { message: `user ${id} Deleted!` },
                { status: 201 }
            )
        // }
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to DELETE', err}, 
            { status: 500 }
        )
    }
}

//API to UPDATE a user (invokes "updateUser")
export const PATCH = async (req: Request) => { 
    const { id, firstName, lastName, username, email, password } = await req.json();
    const session = await getServerSession(authOptions)

    try {
        if (session) {
            const userId = { id }
            const updatedInfo = { firstName, lastName, username, email, password }

            // check if email already exists
            const existingEmail = await db.user.findUnique({
                where: {
                    email: email
                }
            })
            if (existingEmail) {
                return NextResponse.json(
                    {message: 'User with that email already exists!'},
                    {status: 409}
                )
            }
            // check if username already exists
            const existingUsername = await db.user.findUnique({
                where: {
                    username: username
                }
            })
            if (existingUsername) {
                return NextResponse.json(
                    {message: 'User with that username already exists!'},
                    {status: 409}
                )
            }

            updateUser(userId, updatedInfo)
            return NextResponse.json(
                { message: `user ${id} updated!` },
                { status: 201 }
            )
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to UPDATE', err}, 
            { status: 500 }
        )
    }
}

//API to READ a user (invokes "readUser")
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const id = parseInt(searchParams.get('id') ?? '-1')

    if(id !== -1){    
        try {
            readUser(id)
            return NextResponse.json(
                { message: `user READ!` },
                { status: 201 }
            )
            } catch (err) {
            return NextResponse.json(
                { message: 'Failed to READ', err}, 
                { status: 500 }
            )
        }
    } else {
        try {
            readAllUsers()
            return NextResponse.json(
                { message: `all users READ!` },
                { status: 201 }
            )
            } catch (err) {
            return NextResponse.json(
                { message: 'Failed to READ', err}, 
                { status: 500 }
            )
        }
    }
}











