// Component Imports
import Slogan from '@/components/main/home/Slogan'
import GoToDashboard from '../components/main/home/GoToDashboard'
import GetStartedImages from '@/components/main/home/GetStartedImages'
import Footer from '@/components/main/footer/Footer'
import TopBar from '@/components/main/navbar/TopBar'
import DropMenu from '@/components/main/navbar/DropMenu'


const App = () => {

  return (
    <div>
      <DropMenu />
      <TopBar />
      <Slogan />
      <GoToDashboard />
      <GetStartedImages />
      <Footer />
    </div>
  )
}

export default App