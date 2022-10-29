import { useContext } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import { AuthContext } from '@contexts/AuthContext'
import { WorkspacesContext } from '@contexts/WorkspacesContext'

import { GeneralTab } from './GeneralTab'
import { MembersTab } from './MembersTab'
import { Option } from './styles'

export function WorkspaceSettings() {
  const { user } = useContext(AuthContext)
  const { workspaceSelected } = useContext(WorkspacesContext)

  return (
    <Tabs.Root
      defaultValue={
        user?.id === workspaceSelected?.ownerId ? 'general' : 'overview'
      }
      style={{ flex: 1, display: 'flex' }}
    >
      {user?.id === workspaceSelected?.ownerId && (
        <Tabs.List
          style={{ display: 'flex', flexDirection: 'column', width: 240 }}
        >
          <Option value="general">general</Option>
          <Option value="members">members</Option>
        </Tabs.List>
      )}

      <Tabs.Content value="overview">
        <h3>overview</h3>
      </Tabs.Content>

      <Tabs.Content value="general" asChild>
        <GeneralTab />
      </Tabs.Content>

      <Tabs.Content value="members" asChild>
        <MembersTab />
      </Tabs.Content>
    </Tabs.Root>
  )
}
