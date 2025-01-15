
// Component Imports
import AddSectionButton from "@/components/styledElements/AddSectionButton"
import CreateBoardSection from "@/components/dashboard/pages/sharedComponents/board/CreateBoardSection"

export default async function board() {

  return (
    <div className="flex flex-col w-full h-full">
      <AddSectionButton />
      <div className="overflow-auto w-full h-full bg-secondary border-t border-undertone">
        <CreateBoardSection />
      </div>
    </div>
  )

}
