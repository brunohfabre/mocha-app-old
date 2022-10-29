import { Outlet } from 'react-router-dom'

import { PageHeader } from '../../PageHeader'
import { Sidebar } from '../../Sidebar'
import { Container, Content } from './styles'

export function DefaultLayout() {
  return (
    <Container>
      <Sidebar />

      <Content>
        <PageHeader />

        <Outlet></Outlet>
      </Content>
    </Container>
  )
}
