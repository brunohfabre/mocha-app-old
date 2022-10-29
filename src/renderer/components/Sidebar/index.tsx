import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CaretDown } from 'phosphor-react'

import * as Dropdown from '@components/Dropdown'
import { Text } from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import { WorkspacesContext } from '@contexts/WorkspacesContext'

import { CreateWorkspaceModal } from './CreateWorkspaceModal'
import { Container, Option, ProjectButton } from './styles'

export function Sidebar() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const { workspaces, workspaceSelected, selectWorkspace } =
    useContext(WorkspacesContext)

  const [createWorkspaceModalVisible, setCreateWorspaceModalVisible] =
    useState(false)

  const ownWorkspaces = workspaces.filter(
    (workspace) => workspace.ownerId === user?.id,
  )
  const partWorkspaces = workspaces.filter(
    (workspace) => workspace.ownerId !== user?.id,
  )

  return (
    <>
      {createWorkspaceModalVisible && (
        <CreateWorkspaceModal
          open={createWorkspaceModalVisible}
          onOpenChange={setCreateWorspaceModalVisible}
        />
      )}

      <Container>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <ProjectButton>
              <Text>{workspaceSelected?.name}</Text>
              <CaretDown size={16} />
            </ProjectButton>
          </Dropdown.Trigger>

          <Dropdown.Content align="end">
            {!!ownWorkspaces.length && <small>own</small>}
            {ownWorkspaces.map((workspace) => (
              <Dropdown.Item
                key={workspace.id}
                onClick={() => selectWorkspace(workspace)}
              >
                {workspace.name} {workspaceSelected?.id === workspace.id && '✓'}
              </Dropdown.Item>
            ))}

            {!!partWorkspaces.length && <small>part</small>}
            {partWorkspaces.map((workspace) => (
              <Dropdown.Item
                key={workspace.id}
                onClick={() => selectWorkspace(workspace)}
              >
                {workspace.name} {workspaceSelected?.id === workspace.id && '✓'}
              </Dropdown.Item>
            ))}

            <Dropdown.Item onClick={() => navigate('/workspaces/settings')}>
              workspace settings
            </Dropdown.Item>

            <Dropdown.Item onClick={() => setCreateWorspaceModalVisible(true)}>
              Create new workspace
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <nav>
          <Option to="/">home</Option>
          <Option to="/notes">notes</Option>
        </nav>
      </Container>
    </>
  )
}
