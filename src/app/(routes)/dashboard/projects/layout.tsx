
//Component Imports
import Header from "@/components/dashboard/pages/projects/Header"
import Navbar from "@/components/dashboard/Navbar"

interface Props {
  children: React.ReactNode
}

export const ProjectsLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='flex flex-col h-full w-full'>
          <Header />
          <div className="flex overflow-hidden">
            {children}
          </div>
      </section>
    )
  }

  export default ProjectsLayout