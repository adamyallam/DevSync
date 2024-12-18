//Component Imports
import Header from "@/components/dashboard/pages/projects/Header"


interface Props {
  children: React.ReactNode
}

const ProjectsLayout: React.FC<Props> = ({ children }) => {

  return (
    <section className='flex flex-col h-full w-full bg-[#383C3D]'>
      <div>
        <Header />
      </div>
      <div className="flex flex-grow overflow-hidden h-full">
        {children}
      </div>
    </section>
  )
}

export default ProjectsLayout