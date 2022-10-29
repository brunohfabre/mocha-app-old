import { useParams } from 'react-router-dom'

import * as Tabs from '@radix-ui/react-tabs'

import { Profile } from './Profile'
import { List, Tab } from './styles'

export function Settings() {
  const { tab } = useParams<{ tab: string }>()

  return (
    <Tabs.Root defaultValue={tab} style={{ flex: 1, display: 'flex' }}>
      <List>
        <Tab value="profile">profile</Tab>
      </List>

      <Tabs.Content value="profile" asChild>
        <Profile />
      </Tabs.Content>
    </Tabs.Root>
  )
}
