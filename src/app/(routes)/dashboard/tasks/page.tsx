
// Component Imports
import Header from '@/components/dashboard/pages/tasks/Header'
import ContentTransition from '@/utils/ContentTransition'

export default async function tasks() {

  return (
    <div>
      <ContentTransition>
        <Header />
      </ContentTransition>
    </div>
  )

}
