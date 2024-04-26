import "src/app/globals.css";
import NavBar from 'src/components/dashboard/NavBar'

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}
