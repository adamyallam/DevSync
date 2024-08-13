
// Component Imports
import Header from '@/components/dashboard/pages/tasks/Header'
import ContentTransition from '@/components/dashboard/ContentTransition'

export default async function tasks() {

  return (
    <div>
      <ContentTransition>
        <Header />
      </ContentTransition>
    </div>
  )

}
