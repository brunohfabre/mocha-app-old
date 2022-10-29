import { styled } from '@stitches/react'

export const Container = styled('header', {
  height: 48,

  backgroundColor: '$blue300',

  display: 'flex',
  justifyContent: 'space-between',

  padding: '0 8px',

  '> div': {
    display: 'flex',
    alignItems: 'center',

    gap: 8,
  },
})

export const AvatarButton = styled('div', {
  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',

  gap: 8,

  height: 48,

  padding: '0 8px',

  svg: {
    marginLeft: 8,
  },
})
