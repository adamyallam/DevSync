import Slogan from 'src/components/home/Slogan'
import GoToDashboard from '../components/home/GoToDashboard'
import TopBar from 'src/components/navbar/TopBar'
import GetStartedImages from 'src/components/home/GetStartedImages'
import Footer from 'src/components/footer/Footer'


const home = () => {
  return (
      <div>
          <TopBar />
          <Slogan />
          <GoToDashboard />
          <GetStartedImages />
          <Footer />
      </div>
  )
}

export default home