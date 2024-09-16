
//Component Imports
import Header from "@/components/dashboard/pages/projects/Header"


interface Props {
  children: React.ReactNode
}

export const ProjectsLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='flex flex-col h-full w-full'>
        <div>
          <Header />
        </div>
        <div className="flex flex-grow overflow-hidden">
          {children}
        </div>
      </section>
    )
  }

  export default ProjectsLayout