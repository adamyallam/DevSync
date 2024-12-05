'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';

interface Props {
  name: React.ReactNode;
  projectID: number
}

export const ProjectLink: React.FC<Props> = ({ name, projectID }) => {

  const currentPath = usePathSegments(2);

  function applySidebarClass(...pagePaths: string[]) {

    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  return (
    <>
      <Link href={`/dashboard/projects/${projectID}/list`} className={`flex items-center h-8 ${applySidebarClass(`${projectID}/overview`, `${projectID}/list`, `${projectID}/board`, `${projectID}/calendar`, `${projectID}/files`)}`}>
        <div className='border-2 bg-white rounded-md w-4 h-4' />
        <span className='ml-2 text-sm text-[#f3f4f6]'>{name}</span>
      </Link>
    </>
  );
};

export default ProjectLink