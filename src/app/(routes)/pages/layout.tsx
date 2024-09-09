
//Component Imports
import Topbar from "@/components/main/navbar/Topbar"
import DropMenu from "@/components/main/navbar/DropMenu"
import Footer from "@/components/main/footer/Footer"

export default function pagesLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Topbar />
        <DropMenu />
        {children}
        <Footer />
      </section>
    )
  }