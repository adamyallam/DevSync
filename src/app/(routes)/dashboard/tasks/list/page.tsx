
// Component Imports
import UserTasksManager from '@/components/dashboard/pages/tasks/list/UserTasksManager'
import CreateTaskSection from '@/components/dashboard/pages/sharedComponents/list/CreateTaskSection'
import AddTaskHeaderButton from '@/components/styledElements/AddTaskHeaderButton'

export default async function list() {

  return (
    <div className='flex flex-col h-full w-full'>
      <AddTaskHeaderButton />
      <UserTasksManager />
      
      <div className='overflow-x-hidden overflow-y-auto pb-10 h-full' style={{ scrollbarGutter: 'stable' }}>
        <CreateTaskSection />
      </div>
    </div>
  )

}
