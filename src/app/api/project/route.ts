import { NextRequest, NextResponse } from "next/server"
import { createProject, deleteProject, updateProject, readProject, readAllProjects} from "../../../db/db-connections/project"
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
    const { name, description, dueDate} = await req.json();
    const session = await getServerSession(authOptions)
    
    try {
        if (session) {
            const projectData = { name, description, dueDate}
            createProject(projectData)
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
            const projectId = { id }
            deleteProject(projectId)
            return NextResponse.json(
                { message: `project ${id} Deleted!` },
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
    const { id, name, description } = await req.json();
    const session = await getServerSession(authOptions)
    
    try {
        if (session) {
            const projectId = { id }
            const updatedInfo = { name, description }
            updateProject(projectId, updatedInfo)
            return NextResponse.json(
                { message: `project ${id} updated!` },
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


//API to READ a project (invokes "readProject")
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const id = parseInt(searchParams.get('id') ?? '-1')
    const session = await getServerSession(authOptions)

    if (session) {
        if(id !== -1){    
            try {
                readProject(id)
                return NextResponse.json(
                    { message: `project READ!` },
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
                readAllProjects()
                return NextResponse.json(
                    { message: `all projects READ!` },
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
















