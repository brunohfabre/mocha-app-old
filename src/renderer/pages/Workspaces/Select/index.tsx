import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '@contexts/AuthContext'
import { Workspace, WorkspacesContext } from '@contexts/WorkspacesContext'

import { Container } from './styles'

export function WorkspaceSelect() {
  const navigate = useNavigate()

  const { workspaces, selectWorkspace } = useContext(WorkspacesContext)
  const { user, signOut } = useContext(AuthContext)

  function handleSelectWorkspace(workspace: Workspace) {
    selectWorkspace(workspace)

    navigate('/')
  }

  const ownWorkspaces = workspaces.filter(
    (workspace) => workspace.ownerId === user?.id,
  )
  const partWorkspaces = workspaces.filter(
    (workspace) => workspace.ownerId !== user?.id,
  )

  return (
    <Container>
      <p>Click to select one</p>

      {!!ownWorkspaces.length && <small>own</small>}
      {ownWorkspaces.map((workspace) => (
        <button
          type="button"
          key={workspace.id}
          onClick={() => handleSelectWorkspace(workspace)}
        >
          {workspace.name}
        </button>
      ))}

      {!!partWorkspaces.length && <small>part</small>}
      {partWorkspaces.map((workspace) => (
        <button
          type="button"
          key={workspace.id}
          onClick={() => handleSelectWorkspace(workspace)}
        >
          {workspace.name}
        </button>
      ))}

      <button type="button" onClick={signOut} style={{ marginTop: 64 }}>
        sign out
      </button>
    </Container>
  )
}
