'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import { statusConfig } from '@/utils/statusConfig';
import { Status } from '@prisma/client';

interface Props {
  name: string;
  projectID: number,
  defaultView: string,
  status: Status
}

export const ProjectLink: React.FC<Props> = ({ name, projectID, defaultView, status }) => {
  
  const statusStyles = statusConfig[status] || {
    bgColor: 'bg-gray-300',
    icon: <div className="w-4 h-4 rounded-full bg-red-500" />,
  };
  
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
        <div className={`${statusStyles.bgColor} rounded-sm w-3 h-3 shrink-0`} />
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
    </>
  );
};

export default ProjectLink