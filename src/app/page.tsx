import Slogan from 'src/components/home/Slogan'
import GoToDashboard from '../components/home/GoToDashboard'
import GetStartedImages from '@/components/home/GetStartedImages'
import Footer from 'src/components/footer/Footer'
import TopBar from 'src/components/navbar/TopBar'
import DropMenu from 'src/components/navbar/DropMenu'


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