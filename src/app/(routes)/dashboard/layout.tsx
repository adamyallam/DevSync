import NavBar from "@/components/dashboard/NavBar"
import Organizer from "@/components/Organizer"
import { LevelContext } from "@/components/OpenContext"


interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section>
        <Organizer children={children} />
      </section>
    )
  }

  export default dashboardLayout