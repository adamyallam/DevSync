
// Component Imports
import Header from '@/components/dashboard/pages/tasks/Header'
import Transition from '@/components/dashboard/Transition'
import TaskManagement from '@/components/dashboard/pages/tasks/TaskManagement'

export default async function tasks() {

  return (
    <div>
      <Transition transition='translate-x-60'>
          <div className='mt-16'>
            <Header />
          </div>
      </Transition>
      <TaskManagement />
    </div>
  )

}
