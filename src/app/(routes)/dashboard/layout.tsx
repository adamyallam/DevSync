import IsOpenProvider from '@/components/context/IsOpenProvider'


interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section>
        <IsOpenProvider children={children} />
      </section>
    )
  }

  export default dashboardLayout