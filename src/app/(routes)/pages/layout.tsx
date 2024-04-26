import "src/app/globals.css";
import Footer from 'src/components/footer/Footer'
import TopBar from 'src/components/navbar/TopBar'
import DropMenu from 'src/components/navbar/DropMenu'

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <DropMenu />
        <TopBar />
        {children}
        <Footer /> 
    </div>
  )
}
