'use client'
import Link from 'next/link'

interface Props {
  name: React.ReactNode;
  projectID: number
}

export const ProjectBoxLink: React.FC<Props> = ({ name, projectID }) => {

  return (
    <>
      <Link href={`/dashboard/projects/${projectID}/list`} className={'flex items-center h-8'}>
        <div className="flex items-center">
          <div className={`border-2 border-black bg-gray-600 w-10 h-10 rounded-xl`} />
          <p className="ml-3">{name}</p>
        </div>
      </Link>
    </>
  );
};

export default ProjectBoxLink