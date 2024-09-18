
// Component Imports
import MyTasksManager from '@/components/dashboard/pages/tasks/list/MyTasksManager'
import TaskSection from '@/components/dashboard/pages/TaskSection'
import CreateTaskSection from '@/components/dashboard/pages/CreateTaskSection'

export default async function list() {

  return (
    <div className='flex flex-col h-full'>
      <MyTasksManager />
      <div className='overflow-x-hidden overflow-y-auto pb-10'>
        <CreateTaskSection />
      </div>
    </div>
  )

}
