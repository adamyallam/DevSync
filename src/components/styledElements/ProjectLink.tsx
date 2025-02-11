'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import { statusConfig } from '@/utils/statusConfig';
import { Status } from '@prisma/client';
import useMenuClose from '@/utils/hooks/useMenuClose';
import { useState, useRef } from 'react';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import { useParams, useRouter } from 'next/navigation'

interface Props {
  name: string;
  projectID: number,
  defaultView: string,
  status: Status
}

export const ProjectLink: React.FC<Props> = ({ name, projectID, defaultView, status }) => {
  const { toggleCreateProjectForm } = useNavbarUIContext()
  const { removeProject, updateProjectDatabase, projects } = useProjectsDataContext()
  const router = useRouter()
  const { id } = useParams()

  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const menuRef = useRef<HTMLDivElement>(null)
  const projectIconRef = useRef<HTMLDivElement>(null)

  const currentPath = usePathSegments(2);
  function applySidebarClass(...pagePaths: string[]) {

    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  const project = projects?.find((project) => project.id === projectID);

  const statusStyles = statusConfig[status] || {
    bgColor: 'bg-gray-300',
    icon: <div className="w-4 h-4 rounded-full bg-red-500" />,
  };

  useMenuClose(menuRef, projectIconRef, contextMenuOpen, setContextMenuOpen)

  const toggleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const menuWidth = 100;
    const sidebarWidth = 235;

    const xPosition = e.clientX + menuWidth > sidebarWidth ? e.clientX - menuWidth : e.clientX;
    const yPosition = e.clientY - 45;

    setContextMenuPosition({ x: xPosition, y: yPosition })
    setContextMenuOpen(true);
  };

  const deleteProject = async () => {

    try {
      const res = await fetch(`/api/project`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectID }),
      });

      if (!res.ok) { throw new Error('Failed to delete project') }

      if (Number(id) === projectID) {
        router.push('/dashboard/home');
      }

      await removeProject(projectID)
    } catch (err) {
      console.error(`Error deleting task ${projectID}`);
      throw err
    }
  }

  if (!project) return null

  return (
    <div>
      <Link onContextMenu={toggleContextMenu} href={`/dashboard/projects/${projectID}/${defaultView}`} className={`flex items-center h-8 ${applySidebarClass(`${projectID}/overview`, `${projectID}/list`, `${projectID}/board`, `${projectID}/calendar`, `${projectID}/files`)}`}>
        <div ref={projectIconRef} className={`${statusStyles.bgColor} rounded-sm w-3 h-3 shrink-0`} />
        <span style={{
          display: 'block',
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'clip',
          WebkitMaskImage:
            name?.length > 20 // Adjust threshold dynamically
              ? 'linear-gradient(to right, black 90%, transparent 100%)'
              : 'none',
          maskImage:
            name?.length > 20 // Adjust threshold dynamically
              ? 'linear-gradient(to right, black 90%, transparent 100%)'
              : 'normal',
        }} className='ml-2 text-sm text-primary-text whitespace-nowrap overflow-hidden text-ellipsis'>{name}</span>
      </Link>
      {contextMenuOpen && (
        <div ref={menuRef} className={`absolute z-50 bg-primary border-2 border-undertone rounded-md`} style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}>
          <div className="flex flex-col items-start w-full h-full">
            <div className="w-full h-full flex flex-col items-start">
              <button onClick={() => { toggleCreateProjectForm(true), setContextMenuOpen(false) }} className="w-full h-full flex items-center gap-1 text-primary-text text-xs hover:bg-selected p-2"> Create Project</button>
              <button onClick={() => { updateProjectDatabase(project, 'favorited', !project.favorited), setContextMenuOpen(false) }} className="w-full h-full flex items-center gap-1 text-primary-text text-xs hover:bg-selected p-2">{project.favorited ? 'Unfavorite' : 'Favorite'}</button>
              <div className='bg-undertone w-full h-[1px]' />
              <button onClick={() => { deleteProject(), setContextMenuOpen(false) }} className="w-full h-full flex items-center gap-1 text-red-400 text-xs hover:bg-selected p-2 font-semibold">Delete Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectLink