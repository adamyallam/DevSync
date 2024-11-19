'use client'
import Link from 'next/link'
import { usePathSegments } from '@/utils/hooks/usePathSegments';

interface Props {
  name: React.ReactNode;
}

export const ProjectLink: React.FC<Props> = ({name}) => {

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
    <Link href='/dashboard/projects/board' className={`flex items-center h-8 ${applySidebarClass('projects/overview', 'projects/list', 'projects/board', 'projects/calendar', 'projects/files')}`}>
      <div className='border-2 bg-white rounded-md w-4 h-4' />
      <span className='ml-2 text-sm'>{name}</span>
    </Link>
    </>
  );
};

export default ProjectLink