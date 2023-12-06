import { NextResponse } from "next/server"
import { createProject, deleteProject, updateProject } from "../../../db-connections/project"


// TO BE FINISHED LATER (How to connect it to a many-to-many relationship)
//API to add or "POST" a project (invokes "createProject")
export const POST = async (req: Request) => {
    const { projectName, projectDescription /* dueDate */} = await req.json();
    
    try {
        const projectData = { projectName, projectDescription /* dueDate */}
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

//API to DELETE a project (invokes "deleteProject")
export const DELETE = async (req: Request) => { 
    const { id } = await req.json();
    
    try {
        const projectId = { id }
        deleteProject(projectId)
        return NextResponse.json(
            { message: `project ${id} Deleted!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to DELETE', err}, 
            { status: 500 }
        )
    }
}

//API to UPDATE a project (invokes "updateProject")
export const PATCH = async (req: Request) => { 
    const { id, projectName, projectDescription } = await req.json();
    
    try {
        const projectId = { id }
        const updatedInfo = { projectName, projectDescription }
        updateProject(projectId, updatedInfo)
        return NextResponse.json(
            { message: `project ${id} updated!` },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to UPDATE', err}, 
            { status: 500 }
        )
    }
}



















