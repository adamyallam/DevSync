import { NextRequest, NextResponse } from "next/server"
import { createComment, deleteComment, updateComment, readComment, readAllComments } from "../../../db-connections/comment"
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
    const { taskId, userId, title, description} = await req.json();
    const session = await getServerSession(authOptions)
    
    try {
        if (session) {
            const commentData = { taskId, userId, title, description}
            createComment(commentData)
            return NextResponse.json(
                { message: 'New project created!' },
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

//API to DELETE a project (invokes "deleteProject")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();
    const session = await getServerSession(authOptions)
    
    try {
        if (session) {
            const commentId = { id }
            deleteComment(commentId)
            return NextResponse.json(
                { message: `comment ${id} Deleted!` },
                { status: 201 }
            )
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to DELETE', err}, 
            { status: 500 }
        )
    }
}

//API to UPDATE a project (invokes "updateProject")
export const PATCH = async (req: Request) => { 
    const { id, title, description} = await req.json();
    const session = await getServerSession(authOptions)

    try {
        if (session) {
            const commentId = { id }
            const updatedInfo = { title, description }
            updateComment(commentId, updatedInfo)
            return NextResponse.json(
                { message: `comment ${id} updated!` },
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

//API to READ a comment (invokes "readComment")
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const id = parseInt(searchParams.get('id') ?? '-1')
    const session = await getServerSession(authOptions)
    
    if (session) {
        if(id !== -1){    
            try {
                readComment(id)
                return NextResponse.json(
                    { message: `comment READ!` },
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
                readAllComments()
                return NextResponse.json(
                    { message: `all comments READ!` },
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
}
