
// Component Imports
import MyTasksManager from '@/components/dashboard/pages/tasks/list/MyTasksManager'
import TaskSection from '@/components/dashboard/pages/TaskSection'

export default async function list() {

  return (
    <div className='flex flex-col h-full'>
      <MyTasksManager />
      <div className='overflow-x-hidden overflow-y-auto'>
        <TaskSection />
      </div>
    </div>
  )

}
