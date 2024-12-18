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
        <div className="flex items-center hover:font-bold">
          <div className={`border-2 border-undertone bg-primary w-10 h-10 rounded-xl`} />
          <p className="ml-3 text-sm text-primary-text ">{name}</p>
        </div>
      </Link>
    </>
  );
};

export default ProjectBoxLink