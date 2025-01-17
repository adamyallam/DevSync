// Component Imports
import Slogan from '@/components/main/home/Slogan'
import TopBar from '@/components/main/navbar/TopBar'
import DropMenu from '@/components/main/navbar/DropMenu'
import GoToDashboard from '@/components/main/home/GoToDashboard'


const App = () => {

  return (
    <div className='w-full h-full'>
      <DropMenu />
      <TopBar />
      <div className='mt-20'>
        <Slogan />
      </div>

      <div className='flex justify-center'>
        <div className="bg-primary w-[90%] h-[1.5px] mt-7" />
      </div>

      <div className='mt-7'>
        <GoToDashboard />
      </div>


      <div className="fixed bottom-0 bg-primary w-full h-12" />


    </div>
  )
}

export default App