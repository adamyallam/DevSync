// Component Imports
import TopBar from '@/components/main/navbar/TopBar'
import DropMenu from '@/components/main/navbar/DropMenu'
import HomeLanding from '@/components/main/home/HomeLanding'


const App = () => {

  return (
    <div className='w-full h-full flex flex-col'>
      <DropMenu />
      <TopBar />

      <HomeLanding />

      <div className="fixed bottom-0 bg-primary w-full h-12" />


    </div>
  )
}

export default App