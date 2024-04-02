import Slogan from '../components/home/Slogan'
import GoToDashboard from '../components/home/GoToDashboard'
import TopBar from '../components/header/navbar/TopBar'

const home = () => {
  return (
      <div>
          <TopBar />
          <Slogan />
          <GoToDashboard />
      </div>
  )
}

export default home