// Component Imports
import Slogan from '@/components/main/home/Slogan'
import GoToDashboard from '../components/main/home/GoToDashboard'
import GetStartedImages from '@/components/main/home/GetStartedImages'
import Footer from '@/components/main/footer/Footer'
import Topbar from '@/components/main/navbar/Topbar'
import DropMenu from '@/components/main/navbar/DropMenu'


const App = () => {

  return (
    <div>
      <DropMenu />
      <Topbar />
      <Slogan />
      <GoToDashboard />
      <GetStartedImages />
      <Footer />
    </div>
  )
}

export default App