'use client'
import {useState} from 'react'
import Slogan from 'src/components/home/Slogan'
import GoToDashboard from '../components/home/GoToDashboard'
import TopBar from 'src/components/navbar/TopBar'
import GetStartedImages from '@/components/Images/GetStartedImages'
import Footer from 'src/components/footer/Footer'
import DropMenu from '@/components/navbar/DropMenu'


const home = () => {

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

export default home