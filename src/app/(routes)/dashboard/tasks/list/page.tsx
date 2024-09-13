
// Component Imports
import Transition from '@/components/dashboard/Transition'
import TaskManagement from '@/components/dashboard/pages/tasks/TaskManagement'
import MyTasks from '@/components/dashboard/pages/tasks/MyTasks'

export default async function list() {

  return (
    <div className='flex flex-col h-full'>
        <TaskManagement />
      <div className='overflow-x-hidden overflow-y-auto'>
        <Transition transition='translate-x-60'>
          <MyTasks />
        </Transition>
      </div>
    </div>
  )

}
