import { NextResponse } from "next/server"
import { createProject, deleteProject } from "../../../db-connections/project"

//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
    const { members, projectName, projectDescription /* dueDate */} = await req.json();
    
    try {
        const projectData = { members, projectName, projectDescription /* dueDate */}
        createProject(projectData)
        return NextResponse.json(
            { message: 'New project created!' },
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
        const projectId = { id }
        deleteProject(projectId)
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



















