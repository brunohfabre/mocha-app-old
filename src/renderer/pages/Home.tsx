import { styled } from '@stitches/react'

import { Heading } from '@components/Heading'

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  padding: 16,
})

export function Home() {
  return (
    <Container>
      <Heading size="sm">Home page</Heading>
    </Container>
  )
}
