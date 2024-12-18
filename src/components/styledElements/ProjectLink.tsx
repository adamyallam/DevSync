'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';

interface Props {
  name: string;
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
        <div className='bg-white rounded-md w-4 h-4 shrink-0' />
        <span     style={{
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
    </>
  );
};

export default ProjectLink