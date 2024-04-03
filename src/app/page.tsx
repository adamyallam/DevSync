import Slogan from '../components/home/Slogan'
import GoToDashboard from '../components/home/GoToDashboard'
import TopBar from '../components/navbar/TopBar'
import GetStartedImages from '../components/home/GetStartedImages'

const home = () => {
  return (
      <div>
          <TopBar />
          <Slogan />
          <GoToDashboard />
          <GetStartedImages />
      </div>
  )
}

export default home