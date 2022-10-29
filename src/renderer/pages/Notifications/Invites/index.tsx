import { useContext, useEffect, useState } from 'react'

import { format } from 'date-fns'

import { WorkspacesContext } from '@contexts/WorkspacesContext'
import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'

import { Container, InviteItem } from './styles'

type Workspace = {
  id: string
  name: string
}

type Invite = {
  id: string
  createdAt: string
  workspace: Workspace
}

export function Invites() {
  const { setLoading } = useLoading()

  const { addWorkspace } = useContext(WorkspacesContext)

  const [invites, setInvites] = useState<Invite[]>([])

  useEffect(() => {
    async function loadInvites() {
      try {
        setLoading(true)

        const response = await api.get('/invites')

        setInvites(response.data)
      } finally {
        setLoading(false)
      }
    }

    loadInvites()
  }, [])

  async function handleJoin(id: string) {
    try {
      setLoading(true)

      const response = await api.put(`/invites/${id}`)

      addWorkspace(response.data.workspace)

      setInvites((prevState) => prevState.filter((invite) => invite.id !== id))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <header>
        <strong>invites</strong>
      </header>

      {!invites.length && <span>no content</span>}

      {invites.map((invite) => (
        <InviteItem key={invite.id}>
          <div>
            <strong>{invite.workspace.name}</strong>
            <span>
              {format(new Date(invite.createdAt), 'dd/MM/yyyy HH:mm')}
            </span>
          </div>

          <button type="button" onClick={() => handleJoin(invite.id)}>
            join
          </button>
        </InviteItem>
      ))}
    </Container>
  )
}
