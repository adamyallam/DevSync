
// Component Imports
import Header from '@/components/dashboard/pages/tasks/Header'
import ContentTransition from '@/components/dashboard/ContentTransition'
import { PageTitle } from '@/components/dashboard/PageTitle'

export default async function tasks() {

  return (
    <div>
      <PageTitle />
      <ContentTransition>
        <Header />
      </ContentTransition>
    </div>
  )

}
