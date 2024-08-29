
// Component Imports
import Transition from '@/components/dashboard/Transition'
import TaskManagement from '@/components/dashboard/pages/tasks/TaskManagement'
import MyTasks from '@/components/dashboard/pages/tasks/MyTasks'
import Task from '@/components/dashboard/pages/tasks/Task'

export default async function list() {

  return (
    <div>
      <TaskManagement />
      <Transition transition='translate-x-60'>
        <MyTasks />
        <Task showTopBorder={true} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={true}/>
      </Transition>
      <h1 className='mt-20'>Making space</h1>
    </div>
  )

}
