
//Component Imports
import TopBar from "@/components/main/navbar/TopBar"
import DropMenu from "@/components/main/navbar/DropMenu"

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
      </section>
    )
  }