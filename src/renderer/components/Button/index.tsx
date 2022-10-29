import { Text } from '@components/Text'

import { Container } from './styles'

interface Props {
  children: string
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props

export function Button({ children }: ButtonProps) {
  return (
    <Container>
      <Text size="sm">{children}</Text>
    </Container>
  )
}
