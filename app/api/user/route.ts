import { NextRequest, NextResponse } from "next/server"
import { createUser, deleteUser, updateUser, readUser, readAllUsers} from "../../../db-connections/user"
import { hash } from 'bcrypt'

//API to add or "POST" a user (invokes "createUser")
export const POST = async (req: NextRequest) => {
    const { firstName, lastName, username, email, password } = await req.json();
    const hashedPassword = await hash(password, 10)
    
    try {
        const userData = { firstName, lastName, username, email, password: hashedPassword}

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

//API to DELETE a user (invokes "deleteUser")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();

    try {
        const userId = {id}
        deleteUser(userId)
        return NextResponse.json(
            { message: `user ${id} Deleted!` },
            { status: 201 }
        )
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
    
    try {
        const userId = { id }
        const updatedInfo = { firstName, lastName, username, email, password }
        updateUser(userId, updatedInfo)
        return NextResponse.json(
            { message: `user ${id} updated!` },
            { status: 201 }
        )
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











