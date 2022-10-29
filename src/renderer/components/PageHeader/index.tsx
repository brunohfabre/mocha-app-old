import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { CaretLeft, Bell, CaretDown } from 'phosphor-react'

import { Avatar } from '@components/Avatar'
import * as Dropdown from '@components/Dropdown'
import { IconButton } from '@components/IconButton'
import { Text } from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'

import { AvatarButton, Container } from './styles'

export function PageHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, signOut } = useContext(AuthContext)

  const isInternalRoute = location.pathname.split('/').length > 2

  return (
    <Container>
      <div>
        {isInternalRoute && (
          <IconButton type="button" onClick={() => navigate(-1)}>
            <CaretLeft />
          </IconButton>
        )}
      </div>

      <div>
        <IconButton
          type="button"
          onClick={() => navigate('/notifications/invites')}
        >
          <Bell />
        </IconButton>

        <Dropdown.Root>
          <Dropdown.Trigger>
            <AvatarButton>
              <Avatar src={user?.avatarUrl} name={user?.name ?? ''} />
              <Text size="sm">{user?.name}</Text>

              <div>
                <CaretDown size={16} />
              </div>
            </AvatarButton>
          </Dropdown.Trigger>

          <Dropdown.Content align="end">
            <Dropdown.Item onClick={() => navigate('/settings/profile')}>
              profile
            </Dropdown.Item>
            <Dropdown.Item onClick={signOut}>sign out</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    </Container>
  )
}
