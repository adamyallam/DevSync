
// Component Imports
import TaskManagement from '@/components/dashboard/pages/tasks/TaskManagement'
import MyTasks from '@/components/dashboard/pages/tasks/MyTasks'

export default async function list() {

  return (
    <div className='flex flex-col h-full'>
        <TaskManagement />
      <div className='overflow-x-hidden overflow-y-auto'>
        <div>
          <MyTasks />
        </div>
      </div>
    </div>
  )

}
