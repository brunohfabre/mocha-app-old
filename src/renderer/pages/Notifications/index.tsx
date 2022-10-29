import { useParams } from 'react-router-dom'

import * as Tabs from '@radix-ui/react-tabs'

import { Invites } from './Invites'
import { Container, List, Tab } from './styles'

export function Notifications() {
  const { tab } = useParams<{ tab: string }>()

  return (
    <Tabs.Root defaultValue={tab} asChild>
      <Container>
        <List>
          <Tab value="invites">invites</Tab>
        </List>

        <Tabs.Content value="invites" asChild>
          <Invites />
        </Tabs.Content>
      </Container>
    </Tabs.Root>
  )
}
