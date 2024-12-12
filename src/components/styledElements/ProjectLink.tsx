'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';

interface Props {
  name: React.ReactNode;
  projectID: number,
  defaultView: string
}

export const ProjectLink: React.FC<Props> = ({ name, projectID, defaultView }) => {

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
      <Link href={`/dashboard/projects/${projectID}/${defaultView}`} className={`flex items-center h-8 ${applySidebarClass(`${projectID}/overview`, `${projectID}/list`, `${projectID}/board`, `${projectID}/calendar`, `${projectID}/files`)}`}>
        <div className='border-2 bg-white rounded-md w-4 h-4' />
        <span className='ml-2 text-sm text-primary-text'>{name}</span>
      </Link>
    </>
  );
};

export default ProjectLink