import "src/app/globals.css";
import NavBar from 'src/components/dashboard/NavBar'

export default async function DashboardLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}
