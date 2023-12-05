import { NextResponse } from "next/server"
import { createUser, deleteUser, updateUser, /* readUser */} from "../../../db-connections/user"


//API to add or "POST" a user (invokes "createUser")
export const POST = async (req: Request) => {
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

//API to DELETE a user (invokes "deleteUser")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();
    
    try {
        const userId = { id }
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
//To be implemented