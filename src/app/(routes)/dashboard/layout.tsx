import NavBar from "@/components/dashboard/NavBar"

export default function dashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <NavBar />
        {children}

      </section>
    )
  }