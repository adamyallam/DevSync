
//Component Imports
import IsOpenProvider from '@/components/context/IsOpenProvider'

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <IsOpenProvider children={children} />
      </section>
    )
  }

  export default dashboardLayout