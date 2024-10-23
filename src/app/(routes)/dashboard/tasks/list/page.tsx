
// Component Imports
import UserTasksManager from '@/components/dashboard/pages/tasks/list/UserTasksManager'
import CreateTaskSection from '@/components/dashboard/pages/sharedComponents/list/CreateTaskSection'

export default async function list() {

  return (
    <div className='flex flex-col h-full'>
      <UserTasksManager />
      <div className='overflow-x-hidden overflow-y-auto pb-10'>
        <CreateTaskSection />
      </div>
    </div>
  )

}
