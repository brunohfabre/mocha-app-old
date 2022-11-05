import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { Container, Content, Header, Workspace } from './styles'

export function Workspaces() {
  return (
    <Container>
      <Header>
        <Heading size="sm">Workspaces</Heading>

        <Button type="button" onClick={() => console.log('add workspace')}>
          Add workspace
        </Button>
      </Header>

      <Content>
        {new Array(7).fill('').map((item, index) => (
          <Workspace key={String(index + 1)}>
            <header>
              <Text>Workspace title</Text>
            </header>
          </Workspace>
        ))}
      </Content>
    </Container>
  )
}
