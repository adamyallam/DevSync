
// Component Imports
import Header from '@/components/dashboard/pages/tasks/Header'
import Transition from '@/components/dashboard/Transition'
import { PageTitle } from '@/components/dashboard/PageTitle'

export default async function tasks() {

  return (
    <div>
      <Transition transition='translate-x-32'>
        <div className='mt-16 ml-8'>
          <Header />
        </div>
      </Transition>
    </div>
  )

}
