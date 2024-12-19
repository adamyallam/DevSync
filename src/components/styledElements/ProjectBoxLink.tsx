'use client'
import Link from 'next/link'
import {statusConfig, StatusKey} from '@/utils/statusConfig'

interface Props {
  name: React.ReactNode;
  projectID: number
  status: string
}

export const ProjectBoxLink: React.FC<Props> = ({ name, projectID, status }) => {

  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey;
  const { bgColor, icon } = statusConfig[statusKey] || { bgColor: 'bg-gray-100' };

  return (
    <>
      <Link href={`/dashboard/projects/${projectID}/list`} className={'flex items-center hover:bg-highlighted p-2 rounded-md'}>
        <div className="flex items-center font-semibold">
          <div className={`flex items-center justify-center border-2 border-primary ${bgColor} w-10 h-10 rounded-lg`}>{icon}</div>
          <span className="ml-2 text-sm text-primary-text ">{name}</span>
        </div>
      </Link>
    </>
  );
};

export default ProjectBoxLink