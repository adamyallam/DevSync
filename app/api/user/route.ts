import { NextResponse } from "next/server"
import { createUser, deleteUser} from "../../../script"

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

export const DELETE = async (req: Request) => { //sending delete request invokes post method
    const { id } = await req.json();
    
    try {
        let userId = { id } //provides propper output but incorrect syntax ... gives: {id: "int"}, needs to be {id: int}
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