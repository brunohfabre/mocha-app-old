import { styled } from '@stitches/react'

export const Container = styled('div', {
  width: '100vw',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  gap: 8,

  '& p': {
    marginBottom: 32,
  },
})
