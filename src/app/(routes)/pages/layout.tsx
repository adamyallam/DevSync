import TopBar from "@/components/navbar/TopBar"
import DropMenu from "@/components/navbar/DropMenu"
import Footer from "@/components/footer/Footer"

export default function pagesLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <TopBar />
        <DropMenu />
        {children}
        <Footer />
      </section>
    )
  }